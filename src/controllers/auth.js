import expressJWT from 'express-jwt';
import jwt from 'jsonwebtoken';
import {
  AuthorizationError,
  DatabaseError,
  ValidationError,
} from '../helpers/errors';
import { findUserByEmail } from '../db/users';
import { authenticate } from '../helpers/users';
import { SECRET_KEY } from '../config';
import { body, validationResult } from 'express-validator';

export const signin = [
  body('email')
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid')
    .normalizeEmail(),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Password is required'),
  async (req, res, next) => {
    try {
      let errors = validationResult(req);

      if (!errors.isEmpty()) {
        let error = new ValidationError('User data is invalid', 422);
        error.errors = errors.array();
        return next(error);
      }

      let user = await findUserByEmail(req.body.email);
      if (user) {
        if (!authenticate(req.body.password, user.hashed_password, user.salt)) {
          return next(new AuthorizationError('Password is incorrect', 401));
        }

        const token = jwt.sign(
          {
            _id: user._id,
          },
          SECRET_KEY
        );

        return res.json({
          token,
          userId: user._id,
        });
      } else {
        let error = new AuthorizationError(
          'User does not exist. (Check your email)',
          401
        );
        next(error);
      }
    } catch (err) {
      console.log(err);

      let error = new DatabaseError('Failed to find user', 500);
      next(error);
    }
  },
];

export const requireSignIn = expressJWT({
  secret: SECRET_KEY,
  userProperty: 'auth',
});

export const hasAuthorization = (req, res, next) => {
  const isAuthorized =
    req.params.userId && req.auth && req.params.userId === req.auth._id;

  if (!isAuthorized) {
    let error = new AuthorizationError('Not authorized', 403);
    next(error);
  }

  next();
};
