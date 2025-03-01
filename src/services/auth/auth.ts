import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '../../types/types';

/**
 * Middleware function to check if the request contains an access token in the headers
 * 
 * @param request 
 * @param response 
 * @param next 
 * @returns 
 */
export const isAuthorized = (request: Request, response: Response, next: NextFunction) => {
    if (!request.headers.authorization) {
        return next(new ResponseError('[ERROR] Request is not authorized. Access token missing from Authorization header', 401));
    }

    return next();
}