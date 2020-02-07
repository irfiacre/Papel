import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res) => res.status(400).json({
  status: 400,
  error: 'PAGE NOT FOUND',

}));


module.exports = app;
