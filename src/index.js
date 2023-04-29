import express from 'express';
import './database'
import router from './routes/index.routes';

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(router);

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
