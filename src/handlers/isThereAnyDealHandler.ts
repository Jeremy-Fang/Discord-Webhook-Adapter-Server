import { Request, Response } from 'express';

export const getUser = async (request: Request, response: Response) => {
    try {
        if (!request.cookies.access_token) {
            throw Error('Access token required for this function');
        }

        const token = request.cookies.access_token;
        const headers = {
            Authorization: `Bearer ${token}`
        };
        
        const data = await fetch('https://api.isthereanydeal.com/user/info/v2', {
            headers
        });

        const content = await data.json();

        response.send({ statusCode: 200, content });
    } catch (err) {
        console.error(err);

        response.send({ statusCode: 500, message: err.message });
    }
}

export const getWaitlist = async (request: Request, response: Response) => {
    try {
        if (!request.cookies.access_token) {
            throw Error('Access token required for this function');
        }

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

export const addToWaitlist = async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const ids = body.ids;

        if (!ids) {
            throw Error('Game ID(s) is missing');
        }

        if (!request.cookies.access_token) {
            throw Error('Access token required for this function');
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

export const deleteFromWaitlist = async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const ids = body.ids;

        if (!ids) {
            throw Error('Game ID(s) is missing');
        }

        if (!request.cookies.access_token) {
            throw Error('Access token required for this function');
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