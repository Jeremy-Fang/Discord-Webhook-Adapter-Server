import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const registerProfile = async (request: Request, response: Response) => {
    try {
        // const body = request.body;
        const token = request.cookies.access_token;

        // if (!body) {
        //     throw Error('Request body is missing');
        // }

        // const id = body.accountId;

        // if (!id) {
        //     throw Error('Account ID missing from request body');
        // }

        // const name = body.accountName;
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        };

        // if (!name) {
        //     throw Error('Name is required');
        // }

        const data = await fetch('https://api.isthereanydeal.com/profiles/link/v1', {
            method: 'PUT',
            headers,
            body: JSON.stringify({
                "accountId": uuidv4(),
                "accountName": "My Account"
            })
        });

        console.log(data);

        const content = await data.json();

        response.send({statusCode: 200, message: "Hello World", content });
    } catch (err) {
        console.error(err);

        response.send({ statusCode: 500, message: err.message });
    }
}

export const deleteProfile = async (request: Request, response: Response) => {
    try {
        response.send({statusCode: 200, message: "Hello World" });
    } catch (err) {
        console.error(err);

        response.send({ statusCode: 500, message: err.message });
    }
}

export const syncWaitlist = async (request: Request, response: Response) => {
    try {
        response.send({statusCode: 200, message: "Hello World" });
    } catch (err) {
        console.error(err);

        response.send({ statusCode: 500, message: err.message });
    }
}