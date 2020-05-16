import { Router } from 'express';
import multer from 'multer';

import FileBoxesService from '../services/FileBoxesService';
import DeleteFileinBoxService from '../services/DeleteFileinBoxService';

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
    req,
  });

  return res.json(files);
});

FileRouter.delete('/:idFile/boxes/:idBox', async (req, res) => {
  const { idFile, idBox } = req.params;

  const deleteFileinBoxService = new DeleteFileinBoxService();

  await deleteFileinBoxService.execute({ idBox, idFile });

  return res.status(20).send();
});

export default FileRouter;
