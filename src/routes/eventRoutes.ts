import { Router } from "express";
import { webhookPostEvent } from "../handlers/eventHandler";

const eventRouter = Router();

/**
 * @swagger
 * /api/event/{uuid}:
 *  post:
 *      summary: |
 *          Forwards webhook event from IsThereAnyDeal to Discord
 *          after transforming POST data
 *      tags:
 *          - Event:
 *      parameters:
 *      - name: uuid
 *        in: path
 *        description: UUID
 *        required: true
 *      requestBody: 
 *          required: true
 *          description: Data posted from IsThereAnyDeal webhook notification events
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *      responses:
 *          200:
 *              description: Successful Request. Triggers webhook event on linked Discord channel
 *          400:
 *              description: Bad Request. UUID may be incorrect type
 *          404:
 *              description: Entry matching UUID not found
 */
eventRouter.post('/:uuid', webhookPostEvent);

export default eventRouter;