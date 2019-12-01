import express from 'express';
import { signin } from '../controllers/auth';

const authRouter = express.Router();

authRouter.post('/', signin);

export default authRouter;
