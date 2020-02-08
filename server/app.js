import express from 'express';
import client from './routes/clientRoute';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', client);

app.use((req, res) => res.status(400).json({
  status: 400,
  error: 'PAGE NOT FOUND',

}));


export default app;
