import { Router } from 'express';
import multer from 'multer';
import FileBoxesService from '../services/FileBoxesService';
import multerConfig from '../config/multer';

const FileRouter = Router();

const upload = multer(multerConfig);

FileRouter.post('/boxes/:id', upload.single('file'), async (req, res) => {
  const { id } = req.params;
  const { file } = req;

  const fileBoxesService = new FileBoxesService();

  const files = await fileBoxesService.execute({
    boxID: id,
    arquivos: file,
  });

  return res.json(files);
});

export default FileRouter;
