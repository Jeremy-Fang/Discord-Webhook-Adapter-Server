import { Request, Response, NextFunction } from 'express';

/**
 * Middleware function to check if the current client has an access token (in cookies)
 * 
 * @param request 
 * @param response 
 * @param next 
 * @returns 
 */
export const isAuthorized = (request: Request, response: Response, next: NextFunction) => {
    const access_token = request.cookies.access_token;

    if (!access_token) {
        return response.send({ status: 401, message: '[ERROR] Unauthorized Request. Please make sure a valid IsThereAnyDeal access token is included in the session cookies' });
    }

    return next();
}