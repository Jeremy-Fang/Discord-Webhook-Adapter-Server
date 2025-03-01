import { Request, Response } from 'express';
import {
    getWaitlist,
    addToWaitlist,
    deleteFromWaitlist,
    steamIdsToITADIds
} from '../../services/itad/api';
import { getWishlist } from '../../services/steam/api';
import { ResponseError } from '../../types/types';

/**
 * Function that gets the waitlist of the user associated with the provided access token
 * 
 * @param request 
 * @param response 
 */
export const getWaitlistHandler = async (request: Request, response: Response) => {
    try {
        const authHeader = request.headers.authorization;

        if (!authHeader.startsWith('Bearer')) {
            throw new ResponseError(`[ERROR] Malformed Request. Invalid Authorization Header`, 400);
        }

        // acquire token from authorization header
        const token = authHeader.split(' ')[1];

        const waitlistResponse= await getWaitlist(token);

        if (waitlistResponse.status != 200) {
            throw new ResponseError(waitlistResponse.message, waitlistResponse.status);
        }

        response.send({ status: 200, waitlist: waitlistResponse.content });
    } catch (err) {
        response.send({ status: err.status ? err.status: 500, message: err.message });
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
        const authHeader = request.headers.authorization;


        if (!authHeader.startsWith('Bearer')) {
            throw new ResponseError(`[ERROR] Malformed Request. Invalid Authorization Header`, 400);
        }

        // acquire token from authorization header
        const token = authHeader.split(' ')[1];

        if (!ids) {
            throw new ResponseError('[ERROR] Malformed Request. Game ID(s) is missing', 400);
        }

        const itadIds = await steamIdsToITADIds(ids);

        if (itadIds.status != 200) {
            throw new ResponseError(itadIds.message, itadIds.status);
        }

        // filter nulls out of ids and transform Steam game ids to IsThereAnyDeal game ids
        const filteredIds = itadIds.ids.filter(entry => entry != null);

        if (!filteredIds.length) {
            throw new ResponseError('[ERROR] No Provided Ids match a Game.', 404);
        }

        const res = await addToWaitlist(token, filteredIds);

        if (res.status != 200) {
            throw new ResponseError(res.message, res.status);
        }

        response.send({ status: res.status, message: res.message });
    } catch (err) {
        response.send({ status: err.status ? err.status: 500, message: err.message });
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
        const authHeader = request.headers.authorization;

        if (!authHeader.startsWith('Bearer')) {
            throw new ResponseError(`[ERROR] Malformed Request. Invalid Authorization Header`, 400);
        }

        // acquire token from authorization header
        const token = authHeader.split(' ')[1];

        if (!ids) {
            throw new ResponseError('[ERROR] Malformed Request. Game ID(s) is missing', 400);
        }

        const itadIds = await steamIdsToITADIds(ids);

        if (itadIds.status != 200) {
            throw new ResponseError(itadIds.message, itadIds.status);
        }

        // filter nulls out of ids and transform Steam game ids to IsThereAnyDeal game ids
        const filteredIds = itadIds.ids.filter(entry => entry != null);

        if (!filteredIds.length) {
            throw new ResponseError('[ERROR] No Provided Ids match a Game.', 404);
        }

        const res = await deleteFromWaitlist(token, filteredIds);

        if (res.status != 200) {
            throw new ResponseError(res.message, res.status);
        }

        response.send({ status: res.status, message: res.message });
    } catch (err) {
        response.send({ status: err.status ? err.status: 500, message: err.message });
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
        const authHeader = request.headers.authorization;

        if (!authHeader.startsWith('Bearer')) {
            throw new ResponseError(`[ERROR] Malformed Request. Invalid Authorization Header`, 400);
        }

        // acquire token from authorization header
        const token = authHeader.split(' ')[1];

        const wishlist = await getWishlist(steamid);

        if (wishlist.statusCode != 200) {
            throw new ResponseError(wishlist.message, wishlist.status);
        } 

        const ITADIds = await steamIdsToITADIds(wishlist.wishlist);

        if (ITADIds.status != 200) {
            throw new ResponseError(wishlist.message, wishlist.status);
        }

        const { ids } = ITADIds;
        
        const res = await addToWaitlist(token, ids);
        
        if (res.status != 200) {
            throw new ResponseError(res.message, res.status);
        }

        response.send({ status: 200, message: 'Successfully added wishlist items to IsThereAnyDeal waitlist' });
    } catch (err) {
        response.send({ status: err.status ? err.status: 500, message: err.message });
    }
}