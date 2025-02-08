import 'dotenv/config';

import { Request, Response } from 'express';
import { generateCodeChallenge, generateCodeVerifier, generateState } from '../services/auth/pkce';
import { getAccessToken } from '../services/itad/api';

/**
 * Function which starts the PKCE authorization flow, generating a code_verifier, state, and challenge.
 * Afterewards, redirects to the IsThereAnyDeal authorization page.
 * 
 * @param request 
 * @param response 
 */
export const authorize = async (request: Request, response: Response) => {
    try {
        const code = generateCodeVerifier();
        const state = generateState();
        const codeChallenge = generateCodeChallenge(code);

        let scope = [];
        
        scope.push('user_info');
        scope.push('profiles');
        scope.push('wait_read');
        scope.push('wait_write');

        response.cookie(state, code, { maxAge: 1000*60*5 });

        let authUrl = process.env.AUTH_BASE_URL;
        
        authUrl += `?response_type=code`;
        authUrl += `&client_id=${process.env.IS_THERE_ANY_DEAL_CLIENT_ID}`;
        authUrl += `&redirect_uri=${process.env.AUTH_REDIRECT_URL}`;
        authUrl += `&scope=${scope.join('+')}`;
        authUrl += `&state=${state}`;
        authUrl += `&code_challenge=${codeChallenge}`;
        authUrl += `&code_challenge_method=S256`;

        response.redirect(authUrl);
    } catch (err) {
        console.error(err);

        response.send({ statusCode: 500, message: err.message });
    }
}

/**
 * Function called after the user has authorized the application. Takes state and 
 * authorization code returned by the IsThereAnyDeal authorization server and trades
 * it for an access token, then stores it in a cookie.
 * 
 * @param request 
 * @param response 
 */
export const redirect = async (request: Request, response: Response) => {
    try {
        const query = request.query;
        
        if (!query.code) {
            throw Error('Authorization code missing');
        }

        if (!query.state) {
            throw Error('State missing');
        }

        const code = query.code.toString();
        const state = query.state.toString();

        if (!(state in request.cookies)) {
            throw Error('Could not verify code_verifier');
        }

        const access_token = await getAccessToken(request.cookies[state], code);

        if (access_token.statusCode == 500) {
            throw Error(access_token.message);
        }
        
        response.send({ statusCode: 200, access_token });
    } catch (err) {
        console.error(err);

        response.send({ statusCode: 500, message: err.message });
    }
}