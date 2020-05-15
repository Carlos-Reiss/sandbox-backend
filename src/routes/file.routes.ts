import { Router } from 'express';
import File from '../models/File';

const FileRouter = Router();

FileRouter.post('/', async (req, res) => {
  const { title } = req.body;

  const box = await Box.create({
    title,
  });
  return res.json(box);
});

export default FileRouter;
