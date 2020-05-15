import { Request } from 'express';
import { Document } from 'mongoose';
import File from '../models/File';
import Box from '../models/Box';
import AppError from '../errors/AppError';

interface FileInterface extends Document {
  title: string;
  path: string;
}

interface MulterProps {
  originalname: string;
  filename: string;
}

interface FileBoxesInterface {
  boxID: string;
  arquivos: MulterProps;
  req: Request;
}

class FileBoxesService {
  public async execute({
    boxID,
    arquivos,
    req,
  }: FileBoxesInterface): Promise<FileInterface> {
    const box = await Box.findById(boxID);

    if (!box) {
      throw new AppError(
        'the box does not exist create first to add a file',
        400
      );
    }
    const file = await File.create({
      title: arquivos.originalname,
      path: arquivos.filename,
    });

    const boxFiles: FileInterface[] = box.files;

    boxFiles.push(file);

    await box.save();

    req.io.sockets.in(box._id).emit('file', file);

    return file;
  }
}

export default FileBoxesService;
