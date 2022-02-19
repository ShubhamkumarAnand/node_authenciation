import express from 'express';
import {createConnection} from 'typeorm';
import {routes} from './routes';

createConnection().then(() =>
{
  const app = express();

  app.use(express.json());

  routes(app);

  app.listen(5500, () =>
  {
    console.log('Listning to port : 5500');
  });
});
