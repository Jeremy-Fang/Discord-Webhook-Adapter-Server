import { Router } from "express";
import { webhookPostEvent } from "../handlers/eventHandler";

const eventRouter = Router();

eventRouter.post('/:uuid', webhookPostEvent);

export default eventRouter;