import { Router } from 'express';
import { loginUser, loginValidators } from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/login', ...loginValidators, loginUser);

export default authRouter;
