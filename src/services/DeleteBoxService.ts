import Box from '../models/Box';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class DeleteBoxService {
  public async execute({ id }: Request): Promise<void> {
    const boxSearch = await Box.findById(id);

    if (!boxSearch) {
      throw new AppError(
        'the box does not exist create first to add a file',
        400
      );
    }

    await Box.deleteOne(boxSearch);
  }
}

export default DeleteBoxService;
