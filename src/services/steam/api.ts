import { ResponseError } from "../../types/types";
import { SteamWishlistResponse, SteamUserProfileResponse } from "../../types/types";

/**
 * Function which gets the steam wishlist of the user associated with the id
 * if their profile is public
 * 
 * @param steamid steam id
 * @returns Object containing response information 
 */
export const getWishlist = async (steamid: string) => {
    try {
        let url = 'https://api.steampowered.com/IWishlistService/GetWishlist/v1';

        url += `?steamid=${steamid}`;

        const response = await fetch(url);

        if (response.status == 400) {
            throw new ResponseError('[ERROR] Bad Request. Make sure the appid is correct', 400);
        }

        const wishlist = await response.json() as SteamWishlistResponse;

        if (!wishlist.response.items) {
            throw new ResponseError('[ERROR] Could not retrieve wishlist. Please make sure the Steam users wishlist is public', 401);
        }

        return { statusCode: 200, wishlist: wishlist.response.items.map(obj => obj.appid) };
    } catch (err) {
        return { status: err.status ? err.status: 500, message: err.message };
    }
}

/**
 * Function which returns whether or not a steam users profile is public
 * communityvisibilitystatus - 1 = private, 3 = public
 * (necessary to access wishlist)
 * 
 * @param steamid steam id
 * @returns Object containing whether or not the users steam profile is public
 */
export const getUserPublicStatus = async (steamid: string) => {
    try {
        let url = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/';

        url += `?key=${process.env.STEAM_API_KEY}`;
        url += `&steamids=${steamid}`;

        const response = await fetch(url);

        if (response.status == 400) {
            throw new ResponseError('[ERROR] Bad Request. Make sure the appid is correct', 400);
        }

        const user = await response.json() as SteamUserProfileResponse;

        if (!user.response.players.length) {
            throw new ResponseError('[ERROR] User not found', 404);
        }

        return { status: 200, profilePublic: user.response.players[0].communityvisibilitystate == 3 };
    } catch (err) {
        return { status: err.status ? err.status: 500, message: err.message };
    }
}

export const getSteamAppDetails = async (appid: string) => {
    try {
        const response = await fetch(`http://store.steampowered.com/api/appdetails/?appids=${appid}&cc=CA`);

        if (response.status == 400) {
            throw new ResponseError('[ERROR] Bad Request. Make sure the appid is correct', 400);
        }
    } catch (err) {
        return { status: err.status ? err.status: 500, message: err.message };
    }
}