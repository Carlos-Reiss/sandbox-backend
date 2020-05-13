import { Router } from 'express';
import app from './app.routes';

const routes = Router();

routes.use('/', app);

export default routes;
