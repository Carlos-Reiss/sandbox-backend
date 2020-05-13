import { Router } from 'express';

const AppRouter = Router();

AppRouter.get('/', (request, response) => {
  return response.json({ ok: true });
});

export default AppRouter;
