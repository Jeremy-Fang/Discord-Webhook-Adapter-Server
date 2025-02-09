import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '../../types/types';

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
        return next(new ResponseError('[ERROR] Request is not authorized. Please make sure to include a valid IsThereAnyDeal access token in the client cookies', 401));
    }

    return next();
}