import { Router } from "express";
import { 
    deleteFromWaitlistHandler, 
    addToWaitlistHandler, 
    getWaitlistHandler, 
    addSteamWishlist
} from "../../handlers/itad/waitlistHandler";
import { isAuthorized } from "../../services/auth/auth";

const waitlistRouter = Router();

waitlistRouter.use(isAuthorized);

/**
 * @swagger
 * /api/itad/waitlist/:
 *  get:
 *      summary: Retrieves a Users IsThereAnyDeal Waitlist
 *      description: |
 *          Responds with the users IsThereAnyDeal waitlist if a 
 *          valid access token is provided in the request headers
 *      tags:
 *          - Waitlist:
 *      responses:
 *          200:
 *              description: Returns a waitlist JSON object
 *          400:
 *              description: Bad Request
 *          401:
 *              description: Access token not provided or invalid
 */
waitlistRouter.get('/', getWaitlistHandler);

/**
 * @swagger
 * /api/itad/waitlist/add:
 *  put:
 *      summary: Adds an array of game ids to a Users Waitlist
 *      tags:
 *          - Waitlist:
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          ids:
 *                              type: array[string]
 *                              required: true
 *                              example: ["01849783-6a26-7147-ab32-71804ca47e8e"]
 *      responses:
 *          204:
 *              description: Games were successfully added to the Users Waitlist
 *          400:
 *              description: Bad Request. Request body possibly missing or malformed
 *          401:
 *              description: Access token not provided or invalid
 *          404:
 *              description: No Ids matched a game
 */
waitlistRouter.put('/add', addToWaitlistHandler);

/**
 * @swagger
 * /api/itad/waitlist/remove:
 *  delete:
 *      summary: Removes an array of game ids from a Users Waitlist
 *      tags:
 *          - Waitlist:
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          ids:
 *                              type: array[string]
 *                              required: true
 *                              example: ["01849783-6a26-7147-ab32-71804ca47e8e"]
 *      responses:
 *          204:
 *              description: Games were successfully removed from the Users Waitlist
 *          400:
 *              description: Bad Request. Request body possibly missing or malformed
 *          401:
 *              description: Access token not provided or invalid
 *          404:
 *              description: No Ids matched a game
 */
waitlistRouter.delete('/remove', deleteFromWaitlistHandler);

/**
 * @swagger
 * /api/itad/waitlist/steamid/{steamid}:
 *  post:
 *      summary: Adds the games on a Steam Users wishlist to the IsThereAnyDeal Users waitlist
 *      description: |
 *          Adds wishlist of Steam User identified by the provided Steam Id
 *          to the waitlist of the IsThereAnyDeal User identified by the provided
 *          access token. 
 *          <br></br>note: the Steam User's wishlist must be set to public
 *      tags:
 *          - Waitlist:
 *      parameters:
 *      - name: steamid
 *        in: path
 *        description: Steam Id of User
 *        required: true
 *      responses:
 *          200:
 *              description: Games were successfully added to the Users waitlist
 *          400:
 *              description: Bad Request. Steam Id may have been invalid
 *          401:
 *              description: Access token not provided or invalid
 */
waitlistRouter.post('/steamid/:steamid', addSteamWishlist);

export default waitlistRouter;