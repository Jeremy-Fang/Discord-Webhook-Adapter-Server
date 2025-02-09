import { Router } from "express";
import { 
    deleteFromWaitlistHandler, 
    addToWaitlistHandler, 
    getWaitlistHandler, 
    addSteamWishlist
} from "../../handlers/itad/waitlistHandler";
import { isAuthorized } from "../../services/auth/auth";

const waitlistRouter = Router();

waitlistRouter.get('/', isAuthorized, getWaitlistHandler);

waitlistRouter.put('/add', isAuthorized, addToWaitlistHandler);

waitlistRouter.delete('/remove', isAuthorized, deleteFromWaitlistHandler);

waitlistRouter.post('/steamid/:steamid', isAuthorized, addSteamWishlist);

export default waitlistRouter;