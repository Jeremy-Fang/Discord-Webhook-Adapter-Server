export class ResponseError extends Error {
    status ?: number;

    constructor(message?: string, status?: number) {
        super(message);

        this.status = status;
    }
}

export interface SteamUserProfileResponse {
    response: {
        players: [{
            steamid: string;
            communityvisibilitystate: number;
        }];
    };
}

export interface SteamWishlistResponse {
    response: {
        items: [{
            appid: number;
            priority: number;
            date_added: Date;
        }];
    };
}

export default {};