import 'express-async-errors';
import 'reflect-metadata';
import { AppDataSource } from '@shared/typeorm/data-source';
import { errors } from 'celebrate';
import cors from 'cors';
import ErrorHandleMiddleware from '@shared/middlewares/ErrorHandleMiddleware';
import express from 'express';
import routes from './routes';
import rateLimiter from '@shared/middlewares/rateLimiter';

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(rateLimiter);

    app.use(routes);
    app.use(errors());
    app.use(ErrorHandleMiddleware.handleError);

    console.log('Connected to the database successfully!');

    app.listen(3333, () => {
      console.log('Server is running on port 3333!');
    });
  }).catch((error) => {
    console.error('Error during Data Source initialization:', error);
  }
);


