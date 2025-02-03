import { Request, Response } from "express";
import { validate as valid } from 'uuid';
import Map from "../db/schemas/map";

export const webhookPostEvent = async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const params = request.params;

        if (!valid(params.uuid)) {
            throw Error('Invalid UUID');
        }

        const document = await Map.findOne({ ...params });

        console.log(document);
        
        if (!document) {
            throw Error('Matching document could not be found');
        }

        const webhookURL = `https://discord.com/api/webhooks/${document.channel_id}/${document.token}`;

        console.log(webhookURL);

        if (!Object.keys(body).length) {
            throw Error('Request body is missing');
        }

        console.log(body);

        response.send({ statusCode: 200, body, document, url: webhookURL });
    } catch (err) {
        console.error(err);

        response.send({ statusCode: 500, error: err.message});
    }
}