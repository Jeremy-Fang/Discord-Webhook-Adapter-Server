import { Request, Response } from "express";
import { validate as valid } from 'uuid';
import { WebhookClient, EmbedBuilder } from "discord.js";

import Map from "../db/schemas/map";
import { ResponseError } from "../types/types";

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
        const uuid = params.uuid;

        if (!valid(uuid)) {
            throw new ResponseError('[ERROR] Malformed Request. Invalid UUID', 400);
        }

        const document = await Map.findOne({ ...params });

        if (!document) {
            throw new ResponseError('[ERROR] Not Found. Matching document could not be found', 404);
        }

        const webhookURL = `https://discord.com/api/webhooks/${document.webhook_id}/${document.token}`;

        if (!Object.keys(body).length) {
            throw new ResponseError('[ERROR] Malformed Request. Request body is missing', 400);
        }

        const client = new WebhookClient({ url: webhookURL });

        client.send({
            content: JSON.stringify(body),
            username: 'Steam Discount Bot',
            avatarURL: 'https://cdn.freebiesupply.com/images/large/2x/steam-logo-transparent.png',
        });

        response.send({ status: 200, body, url: webhookURL });
    } catch (err) {
        response.send({ status: err.status ? err.status: 500, message: err.message });
    }
}