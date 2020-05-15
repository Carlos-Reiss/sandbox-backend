import { Router } from 'express';
import Box from '../models/Box';

const BoxRouter = Router();

BoxRouter.post('/', async (req, res) => {
  const { title } = req.body;

  const box = await Box.create({
    title,
  });
  return res.json(box);
});

export default BoxRouter;
