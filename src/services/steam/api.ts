
interface SteamUserProfileResponse {
    response: {
        players: [{
            steamid: string;
            communityvisibilitystate: number;
        }];
    };
}

interface SteamWishlist {
    response: {
        items: [{
            appid: number;
            priority: number;
            date_added: Date;
        }];
    };
}

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

        console.log(url);

        const response = await fetch(url);

        if (!response.ok) {
            throw Error('Could not complete api request');
        }

        const wishlist = await response.json() as SteamWishlist;

        if (!wishlist.response) {
            throw Error('Internal server error');
        }

        if (!wishlist.response.items) {
            throw Error('Could not retrieve wishlist, please make sure the steam users wishlist is public');
        }

        return wishlist.response.items.map(obj => obj.appid);
    } catch (err) {
        return { statusCode: 500, message: err.message };
    }
}

/**
 * Function which returns whether or not a steam users profile is public
 * communityvisibilitystatus - 1 = private, 3 = public
 * (necessary to access wishlist)
 * 
 * @param steamid steam id
 * @returns boolean whether or not the users steam profile is public
 */
export const getUserPublicStatus = async (steamid: string) => {
    try {
        let url = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/';

        url += `?key=${process.env.STEAM_API_KEY}`;
        url += `&steamids=${steamid}`;

        const response = await fetch(url);

        if (!response.ok) {
            return false;
        }

        const user = await response.json() as SteamUserProfileResponse;

        if (!user.response.players.length) {
            return false;
        }

        return user.response.players[0].communityvisibilitystate == 3;
    } catch (err) {
        return false;
    }
}