import { Router } from 'express';

import CreateBoxService from '../services/CreateBoxService';
import DeleteBoxService from '../services/DeleteBoxService';
import ListboxesServices from '../services/ListboxesServices';

const BoxRouter = Router();

BoxRouter.post('/', async (req, res) => {
  const { title } = req.body;

  const createBoxService = new CreateBoxService();

  const box = await createBoxService.execute({ title });

  return res.json(box);
});

BoxRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const listboxesServices = new ListboxesServices();

  const boxes = await listboxesServices.execute({ idBox: id });

  return res.json({ boxes });
});

BoxRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const deleteBoxService = new DeleteBoxService();

  await deleteBoxService.execute({ id });

  return res.status(204).json({ ok: true });
});

export default BoxRouter;
