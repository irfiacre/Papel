import http from 'http';
import app from './server/app';

const server = http.createServer(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Port ${port} is Running`);
});
