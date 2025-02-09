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

waitlistRouter.get('/', getWaitlistHandler);

waitlistRouter.put('/add', addToWaitlistHandler);

waitlistRouter.delete('/remove', deleteFromWaitlistHandler);

waitlistRouter.post('/steamid/:steamid', addSteamWishlist);

export default waitlistRouter;