import express from 'express';
import morgan from 'morgan';
import client from './routes/clientRoute';
import admin from './routes/adminRoute';
import cashier from './routes/cashierRoute';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', client);
app.use('/', admin);
app.use('/', cashier);

app.use((req, res) => res.status(400).json({
  status: 400,
  error: 'PAGE NOT FOUND',

}));

export default app;
