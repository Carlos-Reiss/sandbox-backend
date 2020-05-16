import Box from '../models/Box';
import File from '../models/File';
import AppError from '../errors/AppError';

interface Request {
  idFile: string;
  idBox: string;
}

class DeleteFileinBoxService {
  public async execute({ idBox, idFile }: Request): Promise<void> {
    const box = await Box.findById({ _id: idBox });

    const file = await File.findById({ _id: idFile });

    if (!box) {
      throw new AppError(
        'the box does not exist create first to add a file',
        400
      );
    }
    if (!file) {
      throw new AppError(
        'the file does not exist create first to add a file',
        400
      );
    }

    await File.findByIdAndDelete({ _id: idFile });
    return;
  }
}

export default DeleteFileinBoxService;
