import { Router } from "express";
import { authorize, redirect } from '../handlers/authHandler';

const authRouter = Router();

/**
 * @swagger
 * /api/auth/authorize:
 *  get:
 *      summary: Starts PKCE Authorization flow
 *      description: |
 *          Starts PKCE Authorization flow to retrieve an IsThereAnyDeal
 *          access token
 *      tags:
 *          - Authorization:
 *      responses:
 *          200:
 *              description: Successful redirect to IsThereAnyDeal Authorization Server
 *          400:
 *              description: Bad Request
 */
authRouter.get('/authorize', authorize);

/**
 * @swagger
 * /api/auth/redirect:
 *  get:
 *      summary: |
 *          Redirect URL for IsThereAnyDeal Authorization
 *      description: |
 *          Redirect URL from IsThereAnyDeal Authorization server. Trades
 *          authorization code for access token.
 *      tags:
 *          - Authorization:
 *      parameters:
 *      - name: state
 *        in: path
 *        description: Unique identifier for security
 *        required: true
 *      - name: code
 *        in: path
 *        description: Authorization code from IsThereAnyDeal
 *        required: true
 *      responses:
 *          200:
 *              description: Successful request for access token
 *          400:
 *              description: Bad Request
 *          404:
 *              description: Code Verifier missing from cookies
 *          500:
 *              description: Internal Server Error
 */
authRouter.get('/redirect', redirect);

export default authRouter;