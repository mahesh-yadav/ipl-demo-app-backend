import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';
import { json } from 'body-parser';

import matchesRouter from './routes/matches';
import userRouer from './routes/users';
import authRouter from './routes/auth';

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(json());

app.use(express.static(path.join(__dirname, 'static')));

app.use('/matches', matchesRouter);
app.use('/users', userRouer);
app.use('/signin', authRouter);

app.use((err, req, res, next) => {
  console.log(err);

  if (err.name === 'UnauthorizedError') {
    res.status(err.status).json({
      name: err.name,
      message: err.message,
      statusCode: 403,
    });
  }

  const { statusCode, name, message } = err;

  if (statusCode) {
    // Handle database errors
    if (statusCode === 500 || statusCode === 401 || statusCode === 403) {
      res.status(statusCode).json({
        error: {
          name,
          statusCode,
          message,
        },
      });
    } else if (statusCode === 422) {
      // user input validation errors
      res.status(statusCode).json({
        name,
        message: err.message,
        statusCode,
        errors: err.errors,
      });
    }
  }

  next(err);
});

export default app;
