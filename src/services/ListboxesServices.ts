import Box from '../models/Box';
import AppError from '../errors/AppError';

interface Request {
  idBox: string;
}

interface BoxInterface {
  title: string;
  files: [];
}

class ListboxesServices {
  public async execute({ idBox }: Request): Promise<BoxInterface> {
    const boxes = await Box.findById(idBox).populate({
      path: 'files',
      options: { sort: { createdAt: -1 } },
    });

    if (!boxes) {
      throw new AppError(
        'the box does not exist create first to add a file',
        400
      );
    }
    return boxes;
  }
}

export default ListboxesServices;
