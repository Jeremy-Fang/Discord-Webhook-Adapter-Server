import { Request, Response } from "express";
import { validate as valid } from 'uuid';
import { WebhookClient, EmbedBuilder } from "discord.js";

import Map from "../db/schemas/map";

/**
 * Function which is called by the IsThereAnyDeal webhook. It adapts the content posted
 * by the webhook and sends it to the corresponding discord channel registered on the server
 * 
 * @param request 
 * @param response 
 */
export const webhookPostEvent = async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const params = request.params;

        if (!valid(params.uuid)) {
            throw Error('Invalid UUID');
        }

        const document = await Map.findOne({ ...params });

        if (!document) {
            throw Error('Matching document could not be found');
        }

        const webhookURL = `https://discord.com/api/webhooks/${document.webhook_id}/${document.token}`;

        if (!Object.keys(body).length) {
            throw Error('Request body is missing');
        }

        const client = new WebhookClient({ url: webhookURL });

        client.send({
            content: JSON.stringify(body),
            username: 'Steam Discount Bot',
            avatarURL: 'https://cdn.freebiesupply.com/images/large/2x/steam-logo-transparent.png',
        }).catch(err => {
            console.log(err);
        });

        response.send({ statusCode: 200, body, url: webhookURL });
    } catch (err) {
        console.error(err);

        response.send({ statusCode: 500, error: err.message});
    }
}