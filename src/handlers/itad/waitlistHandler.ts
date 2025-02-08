import { Request, Response } from 'express';
import {
    getWaitlist,
    addToWaitlist,
    deleteFromWaitlist
} from '../../services/itad/api';

/**
 * Function that gets the waitlist of the user associated with the provided access token
 * 
 * @param request 
 * @param response 
 */
export const getWaitlistHandler = async (request: Request, response: Response) => {
    try {
        const token = request.cookies.access_token;

        const content = await getWaitlist(token);

        if (content.statusCode == 500) {
            throw Error(content.message);
        }

        response.send({ statusCode: 200, content });
    } catch (err) {
        console.error(err);

        response.send({ statusCode: 500, message: err.message });
    }
}

/**
 * Function that adds an array of games (uuids) to the waitlist of the user associated
 * with the provided access token
 * 
 * @param request 
 * @param response 
 */
export const addToWaitlistHandler = async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const ids = body.ids;

        if (!ids) {
            throw Error('Game ID(s) is missing');
        }

        const token = request.cookies.access_token;

        const data = await addToWaitlist(token, ids);

        if (data.statusCode == 500) {
            throw Error(data.message);
        }

        response.send({ statusCode: data.statusCode });
    } catch (err) {
        console.error(err);

        response.send({ statusCode: 500, message: err.message });
    }
}

/**
 * Function that removes an array of games (uuids) from the waitlist of the user associated
 * with the provided access token
 * 
 * @param request 
 * @param response 
 */
export const deleteFromWaitlistHandler = async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const ids = body.ids;

        if (!ids) {
            throw Error('Game ID(s) is missing');
        }

        const token = request.cookies.access_token;

        const data = await deleteFromWaitlist(token, ids);

        if (data.statusCode == 500) {
            throw Error(data.message);
        }

        response.send({ statusCode: data.statusCode });
    } catch (err) {
        console.error(err);

        response.send({ statusCode: 500, message: err.message });
    }
}