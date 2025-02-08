

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
            Authorization: `Bearer ${token}`
        };
        
        const data = await fetch('https://api.isthereanydeal.com/waitlist/games/v1', {
            headers
        });
    
        const content = await data.json();
    
        return { statusCode: data.status, content };
    } catch (err) {
        return { statusCode: 500, message: err.message };
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
export const addToWaitlist = async (token: string, ids: [string]) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        };

        const data = await fetch('https://api.isthereanydeal.com/waitlist/games/v1', {
            method: 'PUT',
            headers,
            body: JSON.stringify(ids)
        });

        return { statusCode: data.status };
    } catch (err) {
        return { statusCode: 500, message: err.message };
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
export const deleteFromWaitlist = async (token: string, ids: [string]) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        };

        const data = await fetch('https://api.isthereanydeal.com/waitlist/games/v1', {
            method: 'DELETE',
            headers,
            body: JSON.stringify(ids)
        });

        return { statusCode: data.status };
    } catch (err) {
        return { statusCode: 500, message: err.message };
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
    
    
        const data = await fetch(process.env.TOKEN_BASE_URL, { body: new URLSearchParams(body), ...options });
    
        const content = await data.json();
    
        if (Object.keys(content).indexOf('access_token') == -1) {
            throw Error('Unable to retrieve access token');
        }
    
        return content['access_token'];
    } catch (err) {
        return { statusCode: 500, message: err.message };
    }
}