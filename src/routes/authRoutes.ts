import { Router } from "express";
import { authorize, redirect } from '../handlers/authHandler';

const authRouter = Router();

authRouter.get('/authorize', authorize);

authRouter.get('/redirect', redirect);

export default authRouter;