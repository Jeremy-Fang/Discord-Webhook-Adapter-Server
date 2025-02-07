import { Router } from "express";
import { deleteFromWaitlist, getUser, addToWaitlist, getWaitlist } from "../handlers/isThereAnyDealHandler";
import { isAuthorized } from "../services/auth/auth";

const isThereAnyDealRouter = Router();

isThereAnyDealRouter.get('/user', isAuthorized, getUser);

isThereAnyDealRouter.get('/waitlist', isAuthorized, getWaitlist);

isThereAnyDealRouter.put('/waitlist/add', isAuthorized, addToWaitlist);

isThereAnyDealRouter.delete('/waitlist/remove', isAuthorized, deleteFromWaitlist);

export default isThereAnyDealRouter;