import 'dotenv/config';

import { Request, Response } from 'express';
import { generateCodeChallenge, generateCodeVerifier, generateState } from '../services/auth/pkce';

export const authorize = async (request: Request, response: Response) => {
    try {
        const code = generateCodeVerifier();
        const state = generateState();
        const codeChallenge = generateCodeChallenge(code);

        let scope = [];

        console.log("code", code);
        console.log("state", state);
        console.log("challenge", codeChallenge);
        
        scope.push('user_info');

        let authUrl = process.env.AUTH_BASE_URL;
        
        authUrl += `?response_type=code`;
        authUrl += `&client_id=${process.env.IS_THERE_ANY_DEAL_CLIENT_ID}`;
        authUrl += `&redirect_uri=${process.env.AUTH_REDIRECT_URL}`;
        authUrl += `&scope=${scope.join('+')}`;
        authUrl += `&state=${state}`;
        authUrl += `&code_challenge=${codeChallenge}`;
        authUrl += `&code_challenge_method=S256`;

        response.send({ statusCode: 200, code, codeChallenge, authUrl });
    } catch (err) {
        console.error(err);

        response.send({ statusCode: 500, message: err.message });
    }
}

export const redirect = async (request: Request, response: Response) => {
    try {
        const query = request.query;
        
        if (!query.code) {
            throw Error('Authorization code missing');
        }

        if (!query.state) {
            throw Error('State missing');
        }

        const code = query.code;
        const state = query.state;

        response.send({ statusCode: 200, state, code });
    } catch (err) {
        console.error(err);

        response.send({ statusCode: 500, message: err.message });
    }
}