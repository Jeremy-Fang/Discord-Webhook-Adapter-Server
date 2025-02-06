import { Router } from "express";
import { deleteFromWaitlist, getUser, addToWaitlist } from "../handlers/isThereAnyDealHandler";

const isThereAnyDealRouter = Router();

isThereAnyDealRouter.get('/user', getUser);

isThereAnyDealRouter.put('/waitlist/add', addToWaitlist);

isThereAnyDealRouter.delete('/waitlist/remove', deleteFromWaitlist);

export default isThereAnyDealRouter;