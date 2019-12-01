import express from 'express';
import { createNewUser, getUser } from '../controllers/users';
import { requireSignIn, hasAuthorization } from '../controllers/auth';

const userRouter = express();

userRouter.post('/', createNewUser);

userRouter.get('/:userId', requireSignIn, hasAuthorization, getUser);

userRouter.put('/:userId', (req, res, next) => {});

userRouter.delete('/:userId', (req, res, next) => {});

export default userRouter;
