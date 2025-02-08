import { Router } from "express";
import { deleteFromWaitlist, addToWaitlist, getWaitlist } from "../../handlers/itad/waitlistHandler";
import { isAuthorized } from "../../services/auth/auth";

const waitlistRouter = Router();

waitlistRouter.get('/', isAuthorized, getWaitlist);

waitlistRouter.put('/add', isAuthorized, addToWaitlist);

waitlistRouter.delete('/remove', isAuthorized, deleteFromWaitlist);

export default waitlistRouter;