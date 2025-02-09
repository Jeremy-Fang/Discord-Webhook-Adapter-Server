import { Request, Response, NextFunction } from 'express';

/**
 * Logging middleware for requests
 * @param request 
 * @param response 
 * @param next 
 */
export const logger = async (request: Request, response: Response, next: NextFunction) => {
    console.log(`[${request.method.toUpperCase()}] ${request.url}`);
    console.log(`Time: ${new Date().toLocaleString()}`);

    next();
}