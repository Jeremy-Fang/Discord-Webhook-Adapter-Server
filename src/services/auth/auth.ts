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
    console.log(request.cookies)
    const access_token = request.cookies.access_token;

    if (!access_token) {
        response.status(401);
        
        return next(new Error('User is not authorized to access this endpoint'));
    }

    return next();
}