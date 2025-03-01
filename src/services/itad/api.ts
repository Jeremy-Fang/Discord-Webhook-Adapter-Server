import { ResponseError } from '../../types/types';

/**
 * Function that returns an array of ITAD game ids matching the input array
 * of steam game ids
 * 
 * @param ids Array of steam game ids
 * @returns Object containing a status code and array of IsThereAnyDeal game ids 
 */
export const steamIdsToITADIds = async (ids: number[]) => {
    try {
        const steamShopId = '61'; // steam shop id
        const idsWithPrefix = ids.map(id => `app/${id}`)
        const response = await fetch(`https://api.isthereanydeal.com/lookup/id/shop/${steamShopId}/v1`, {
            method: 'POST',
            body: JSON.stringify(idsWithPrefix)
        });

        if (response.status == 400) {
            throw new ResponseError('[ERROR] Bad Request. Please make sure the ids are numbers', response.status);
        }

        const ITADMap = await response.json();

        return { status: 200, ids: idsWithPrefix.map(id => ITADMap[id]) };
    } catch (err) {
        return { status: err.status ? err.status: 500, message: err.message };
    }
}

/**
 * Function that makes fetch request for waitlist of user associated with
 * the passed access token
 * 
 * @param token ITAD access token
 * @returns Object containing retrieved information
 */
export const getWaitlist = async (token: string) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        };
        
        const response = await fetch('https://api.isthereanydeal.com/waitlist/games/v1', {
            headers
        });
    
        if (response.status == 400) {
            throw new ResponseError('[ERROR] Bad Request. Something went wrong', response.status);
        }

        if (response.status == 401) {
            throw new ResponseError('[ERROR] Invalid access token. Please get a new valid access token', response.status);
        }

        const content = await response.json();
    
        return { status: response.status, content };
    } catch (err) {
        return { status: err.status ? err.status: 500, message: err.message };
    }
}

/**
 * Function that makes put request to ITAD api to add games associated with 
 * ids to the users waitlist
 * 
 * @param token ITAD access token
 * @param ids Array containing game ids
 * @returns Object containing response information
 */
export const addToWaitlist = async (token: string, ids: string[]) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        };

        const response = await fetch('https://api.isthereanydeal.com/waitlist/games/v1', {
            method: 'PUT',
            headers,
            body: JSON.stringify(ids)
        });

        if (response.status == 401) {
            throw new ResponseError('[ERROR] Invalid access token. Please get a new valid access token', response.status);
        }

        if (response.status == 400) {
            throw new ResponseError('[ERROR] Bad Request. Please make sure the ids are uuids', response.status);
        }

        return { status: response.status, message: 'Games successfully added to waitlist' };
    } catch (err) {
        return { status: err.status ? err.status: 500, message: err.message };
    }
}

/**
 * Function that makes delete request to ITAD api to remove games associated
 * with ids from the users waitlist
 * 
 * @param token ITAD access token
 * @param ids Array containing game ids
 * @returns Object containing response information
 */
export const deleteFromWaitlist = async (token: string, ids: string[]) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        };

        const response = await fetch('https://api.isthereanydeal.com/waitlist/games/v1', {
            method: 'DELETE',
            headers,
            body: JSON.stringify(ids)
        });

        if (response.status == 401) {
            throw new ResponseError('[ERROR] Invalid access token. Please get a new valid access token', response.status);
        }

        if (response.status == 400) {
            throw new ResponseError('[ERROR] Bad Request. Please make sure the ids are uuids', response.status);
        }

        return { status: response.status, message: 'Games successfully removed to waitlist' };
    } catch (err) {
        return { status: err.status ? err.status: 500, message: err.message };
    }
}

/**
 * Function that trades a code verifier and authorization code for an access code
 * 
 * @param code_verifier
 * @param code 
 * @returns string Access token if the authorization is successful
 */
export const getAccessToken = async (code_verifier: string, code: string) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
    
        let body = {
            client_id: process.env.IS_THERE_ANY_DEAL_CLIENT_ID,
            grant_type: "authorization_code",
            code_verifier,
            code,
            redirect_uri: process.env.AUTH_REDIRECT_URL
        };
    
    
        const response = await fetch(process.env.TOKEN_BASE_URL, { body: new URLSearchParams(body), ...options });
    
        const content = await response.json();
    
        if (Object.keys(content).indexOf('access_token') == -1) {
            throw new ResponseError('[ERROR] Unable to retrieve access token', 401);
        }
    
        return content['access_token'];
    } catch (err) {
        return { status: err.status ? err.status: 500, message: err.message };
    }
}