import { body, validationResult } from 'express-validator';
import { client } from '../db/connection';
import { createUser, findUserById } from '../db/users';
import { makeSalt, encryptPassword } from '../helpers/users';
import { ValidationError, DatabaseError } from '../helpers/errors';

export const createNewUser = [
  body('username')
    .not()
    .isEmpty()
    .withMessage('Username is required')
    .isLength({ min: 6 })
    .withMessage('Username must be atleast six characters'),

  body('email')
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid')
    .normalizeEmail()
    .custom(async (value) => {
      let db = client.db('xseed');
      let collection = db.collection('users');

      return collection.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject('Email-already in use');
        }
      });
    }),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Password is required'),
  async (req, res, next) => {
    try {
      let errors = validationResult(req);

      if (!errors.isEmpty()) {
        let error = new ValidationError('User input is invalid', 422);
        error.errors = errors.array();
        next(error);
      } else {
        let { username, email, password } = req.body;

        let salt = makeSalt();
        let hashed_password = encryptPassword(password, salt);

        let user = {
          username,
          email,
          hashed_password,
          salt,
        };
        {
          let result = await createUser(user);
          const { username, _id, email } = result.ops[0];
          res.status(200).json({
            count: result.insertedCount,
            username,
            _id,
            email,
          });
        }
      }
    } catch (err) {
      console.log(err);

      let error = new DatabaseError('Failed to create user', 500);
      next(error);
    }
  },
];

export const getUser = async (req, res, next) => {
  try {
    let user = await findUserById(req.params.userId);

    if (user) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(200).json({});
    }
  } catch (err) {
    console.log(err);
    let error = new DatabaseError('Failed to fetch data', 500);
    next(error);
  }
};
