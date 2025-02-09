import { Request, Response } from "express";
import { parseLink } from "../services/utilities/parser";
import { validate as valid } from 'uuid';
import Map from '../db/schemas/map';
import { ResponseError } from "../types/types";

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
            throw new ResponseError('[ERROR] Malformed Request. Invalid UUID', 400);
        }

        const data = await Map.findOne({ uuid });

        response.send({ status: 200, data });
    } catch (err) {
        response.send({ status: err.status ? err.status: 500, message: err.message });
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
            throw new ResponseError('[ERROR] Malformed Request. URL missing from body', 400);
        }

        const data = parseLink(url);

        if (!data.webhook_id || !data.token) {
            throw new ResponseError('[ERROR] Malformed Request. Invalid Webhook URL', 400);
        }

        const document = await Map.create(data);

        response.send({ status: 200, document, message: 'Document successfully created' });
    } catch (err) {
        response.send({ status: err.status ? err.status: 500, message: err.message });
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
            throw new ResponseError('[ERROR] Malformed Request. Invalid UUID', 400);
        }

        const url = body.url;

        if (!url) {
            throw new ResponseError('[ERROR] Malformed Request. Discord webhook URL missing', 400);
        }

        const data = parseLink(url);

        if (!data.webhook_id || !data.token) {
            throw new ResponseError('[ERROR] Malformed Request. Invalid Webhook URL', 400);
        }

        const document = await Map.findOneAndUpdate({ uuid }, data, { new: true });

        if (!document) {
            throw new ResponseError('[ERROR] Internal Server Error. Document could not be updated', 500);
        }

        response.send({ status: 200, document, message: 'Document successfully updated' });
    } catch (err) {
        response.send({ status: err.status ? err.status: 500, message: err.message });
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
            throw new ResponseError('[ERROR] Malformed Request. Invalid UUID', 400);
        }

        const document = await Map.deleteOne({ uuid });

        if (document.deletedCount == 0) {
            throw new ResponseError('[ERROR] Internal Server Error. Document could not be deleted', 500);
        }

        response.send({ status: 200, document, message: 'Document successfully deleted' });
    } catch (err) {
        response.send({ status: err.status ? err.status: 500, message: err.message });
    }
}