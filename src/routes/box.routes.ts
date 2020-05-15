import { Router } from 'express';
import Box from '../models/Box';
import CreateBoxService from '../services/CreateBoxService';

const BoxRouter = Router();

BoxRouter.post('/', async (req, res) => {
  const { title } = req.body;

  const createBoxService = new CreateBoxService();

  const box = await createBoxService.execute({ title });

  return res.json(box);
});

BoxRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const boxes = await Box.findById(id).populate({
    path: 'files',
    options: { sort: { createdAt: -1 } },
  });

  return res.json({ boxes });
});

export default BoxRouter;
