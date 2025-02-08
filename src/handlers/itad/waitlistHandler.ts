import { Request, Response } from 'express';

/**
 * Function that gets the waitlist of the user associated with the provided access token
 * 
 * @param request 
 * @param response 
 */
export const getWaitlist = async (request: Request, response: Response) => {
    try {
        const token = request.cookies.access_token;
        const headers = {
            Authorization: `Bearer ${token}`
        };
        
        const data = await fetch('https://api.isthereanydeal.com/waitlist/games/v1', {
            headers
        });

        const content = await data.json();

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
export const addToWaitlist = async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const ids = body.ids;

        if (!ids) {
            throw Error('Game ID(s) is missing');
        }

        const token = request.cookies.access_token;
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        };

        const data = await fetch('https://api.isthereanydeal.com/waitlist/games/v1', {
            method: 'PUT',
            headers,
            body: JSON.stringify(ids)
        });

        response.send({ statusCode: data.status, data });
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
export const deleteFromWaitlist = async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const ids = body.ids;

        if (!ids) {
            throw Error('Game ID(s) is missing');
        }

        const token = request.cookies.access_token;
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        };

        const data = await fetch('https://api.isthereanydeal.com/waitlist/games/v1', {
            method: 'DELETE',
            headers,
            body: JSON.stringify(ids)
        });

        response.send({ statusCode: data.status, data });
    } catch (err) {
        console.error(err);

        response.send({ statusCode: 500, message: err.message });
    }
}