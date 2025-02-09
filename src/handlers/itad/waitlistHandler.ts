import { Request, Response } from 'express';
import {
    getWaitlist,
    addToWaitlist,
    deleteFromWaitlist,
    steamIdsToITADIds
} from '../../services/itad/api';
import { getWishlist } from '../../services/steam/api';

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

/**
 * Function which retrieves a steam users wishlist and adds it the the IsThereAnyDeal users
 * waitlist
 * 
 * @param request 
 * @param response 
 */
export const addSteamWishlist = async (request: Request, response: Response) => {
    try {
        const params = request.params;
        const steamid = params.steamid;

        const wishlist = await getWishlist(steamid);

        if (wishlist.statusCode != 200) {
            throw Error('Could not retrieve wishlist, please make sure the wishlist is public');
        } 

        const ITADIds = await steamIdsToITADIds(wishlist.wishlist);
        const token = request.cookies.access_token;

        if (ITADIds.statusCode != 200) {
            throw Error('Problem occurred while querying the IsThereAnyDeal api');
        }

        const { ids } = ITADIds;
        
        const data = await addToWaitlist(token, ids);
        
        if (!(data.statusCode == 200 || data.statusCode == 204)) {
            throw Error('Error adding items to wishlist');
        }

        response.send({ statusCode: 200, message: 'Successfully added wishlist items to IsThereAnyDeal waitlist' });
    } catch (err) {
        console.error(err);

        response.send({ statusCode: 500, message: err.message });
    }
}