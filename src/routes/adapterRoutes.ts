import { Router } from 'express';
import { 
    getDiscordWebhookById,
    registerDiscordWebhook,
    updateDiscordWebhookMap,
    deleteDiscordWebhookMap
} from '../handlers/adapterHandler';

const adapterRouter = Router();

/**
 * @swagger
 * /api/adapter/{uuid}:
 *  get:
 *      summary: Retrieves the Discord webhook associated with the UUID provided
 *      tags:
 *          - Adapter:
 *      parameters:
 *      - name: uuid
 *        in: path
 *        description: UUID
 *        required: true
 *      responses:
 *          200:
 *              description: Returns a JSON object containing Discord webhook info
 *          400:
 *              description: Bad Request
 *          404:
 *              description: UUID is not associated with a Discord webhook
 */
adapterRouter.get('/:uuid', getDiscordWebhookById);

/**
 * @swagger
 * /api/adapter/:
 *  post:
 *      summary: |
 *          Registers a Discord webhook in the database and returns an associated 
 *          UUID
 *      tags:
 *          - Adapter:
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          url:
 *                              type: string
 *                              required: true
 *                              example: "https://discord.com/api/webhooks/1334687061420281998/v9JndH8vymQbEQewvV6ew4xcirewAoDRyt2IsZPnr2aUQeD7trjW3WM7qfMVB9h_IKuB"
 *      responses:
 *          200:
 *              description: Webhook successfully registered
 *          400:
 *              description: Bad Request. URL may not be a Discord webhook url
 */
adapterRouter.post('/', registerDiscordWebhook);

/**
 * @swagger
 * /api/adapter/{uuid}:
 *  patch:
 *      summary: |
 *          Updates an entry in the database matching the UUID with
 *          a new Discord webhook
 *      tags:
 *          - Adapter:
 *      parameters:
 *      - name: uuid
 *        in: path
 *        description: UUID
 *        required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          url:
 *                              type: string
 *                              required: true
 *                              example: "https://discord.com/api/webhooks/1334687061420281998/v9JndH8vymQbEQewvV6ew4xcirewAoDRyt2IsZPnr2aUQeD7trjW3WM7qfMVB9h_IKuB"
 *      responses:
 *          200:
 *              description: Webhook successfully updated
 *          400:
 *              description: Bad Request. URL may not be a Discord webhook url
 *          404:
 *              description: Entry matching UUID not found
 */
adapterRouter.patch('/:uuid', updateDiscordWebhookMap);

/**
 * @swagger
 * /api/adapter/{uuid}:
 *  delete:
 *      summary: |
 *          Deletes an entry in the database matching the UUID
 *      tags:
 *          - Adapter:
 *      parameters:
 *      - name: uuid
 *        in: path
 *        description: UUID
 *        required: true
 *      responses:
 *          200:
 *              description: Entry successfully deleted
 *          400:
 *              description: Bad Request. uuid likely not a UUID
 *          500:
 *              description: Internal Server Error. Could not delete the entry
 */
adapterRouter.delete('/:uuid', deleteDiscordWebhookMap);

export default adapterRouter;