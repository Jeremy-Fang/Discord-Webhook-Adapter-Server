import { Router } from "express";
import { deleteProfile, registerProfile, syncWaitlist } from "../../handlers/itad/profileHandler";
import { isAuthorized } from "../../services/auth/auth";

const profileRouter = Router();

profileRouter.put('/link', isAuthorized, registerProfile);

profileRouter.delete('unlink', isAuthorized, deleteProfile);

profileRouter.put('/sync', isAuthorized, syncWaitlist);

export default profileRouter;