import { Router } from 'express';
import BoxRouter from './box.routes';
import FileRouter from './file.routes';

const routes = Router();

routes.use('/boxes', BoxRouter);
routes.use('/files', FileRouter);

export default routes;
