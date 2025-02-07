import { Request, Response } from "express";
import { parseLink } from "../services/utilities/parser";
import { validate as valid } from 'uuid';
import Map from '../db/schemas/map';

/**
 * Function which retrieves discord webhook data corresponding to the uuid passed
 * as a parameter
 * 
 * @param request 
 * @param response 
 */
export const getDiscordWebhookById = async (request: Request, response: Response) => {
    try {
        const params = request.params;
        const uuid = params.uuid;

        if (!valid(uuid)) {
            throw Error('Invalid UUID');
        }

        const data = await Map.findOne({ uuid });

        response.send({ statusCode: 200, data });
    } catch (err) {
        console.error(err);

        response.send({ statusCode: 500, error: err.message });
    }
}

/**
 * Maps a discord webhook to a unique uuid
 * 
 * @param request 
 * @param response 
 */
export const registerDiscordWebhook = async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const url = body.url;

        if (!url) {
            throw Error('URL missing from body');
        }

        const data = parseLink(url);

        if (!data.webhook_id || !data.token) {
            throw Error('Invalid Webhook URL');
        }

        const document = await Map.create(data);

        response.send({ statusCode: 200, document, message: 'Document successfully created' });
    } catch (err) {
        console.error(err);

        response.send({ statusCode: 500, error: err.message });
    }
}

/**
 * Updates existing entry in the database using data passed in the request body
 * 
 * @param request 
 * @param response 
 */
export const updateDiscordWebhookMap = async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const params = request.params;
        const uuid = params.uuid;

        if (!valid(uuid)) {
            throw Error('Invalid UUID');
        }

        const url = body.url;

        if (!url) {
            throw Error('Discord webhook URL missing');
        }

        const data = parseLink(url);

        if (!data.webhook_id || !data.token) {
            throw Error('Invalid Webhook URL');
        }

        const document = await Map.findOneAndUpdate({ uuid }, data, { new: true });

        if (!document) {
            throw Error('Document could not be updated');
        }

        response.send({ statusCode: 200, document, message: 'Document successfully updated' });
    } catch (err) {
        console.error(err);

        response.send({ statusCode: 500, error: err.message });
    }
}

/**
 * Deletes an entry in the database corresponding to the uuid passed in the parameters
 * 
 * @param request 
 * @param response 
 */
export const deleteDiscordWebhookMap = async (request: Request, response: Response) => {
    try {
        const params = request.params;
        const uuid = params.uuid;

        if (!valid(uuid)) {
            throw Error('Invalid UUID');
        }

        const document = await Map.deleteOne({ uuid });

        if (document.deletedCount == 0) {
            throw Error('No entries deleted');
        }

        response.send({ statusCode: 200, document, message: 'Document successfully deleted' });
    } catch (err) {
        console.error(err);

        response.send({ statusCode: 500, error: err.message });
    }
}