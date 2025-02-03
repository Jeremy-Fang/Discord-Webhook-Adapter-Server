import { Router } from 'express';
import { 
    getDiscordWebhookById,
    registerDiscordWebhook,
    updateDiscordWebhookMap,
    deleteDiscordWebhookMap
} from '../handlers/adapterHandler';

const adapterRouter = Router();

// GET the discord webhook link associated with a specific uuid 
adapterRouter.get('/:uuid', getDiscordWebhookById);

// POST register a discord webhook and return a uuid that maps back to it
adapterRouter.post('/', registerDiscordWebhook);

// UPDATE the discord webhook associataed with a uuid
adapterRouter.patch('/:uuid', updateDiscordWebhookMap);

// DELETE the uuid entry 
adapterRouter.delete('/:uuid', deleteDiscordWebhookMap);

export default adapterRouter;