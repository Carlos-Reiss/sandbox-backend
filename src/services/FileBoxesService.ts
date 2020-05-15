import { Document } from 'mongoose';
import File from '../models/File';
import Box from '../models/Box';

interface FileInterface extends Document {
  title: string;
  path: string;
}

interface MulterProps {
  originalname: string;
  filename: string;
}

interface Request {
  boxID: string;
  arquivos: MulterProps;
}

class FileBoxesService {
  public async execute({ boxID, arquivos }: Request): Promise<FileInterface> {
    const box = await Box.findById(boxID);

    if (!box) {
      throw new Error('Box is not exist');
    }
    const file = await File.create({
      title: arquivos.originalname,
      path: arquivos.filename,
    });

    const boxFiles: FileInterface[] = box.files;

    boxFiles.push(file);

    await box.save();

    return file;
  }
}

export default FileBoxesService;
