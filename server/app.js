import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from '../swagger.json';
import client from './routes/clientRoute';
import admin from './routes/adminRoute';
import cashier from './routes/cashierRoute';
import reseting from './routes/resetRoute';
import logger from './logger';

const app = express();
app.all('*', (req, res, next) => {
  logger.info('Incoming Request', { method: req.method, URL: req.originalUrl });
  logger.debug('Incoming Request Verbose', {
    headers: req.headers,
    params: req.params,
    query: req.query,
    body: req.body,
  });
  return next();
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', client);
app.use('/', admin);
app.use('/', cashier);
app.use('/', reseting);

app.use((req, res) => res.status(400).json({
  status: 400,
  error: ' PAGE NOT FOUND ',

}));

export default app;
