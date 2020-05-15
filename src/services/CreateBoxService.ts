import Box from '../models/Box';

interface BoxInterface {
  title: string;
}

class CreateBoxService {
  public async execute({ title }: BoxInterface): Promise<BoxInterface> {
    const boxSearch = await Box.findOne({ title });

    if (boxSearch) {
      return boxSearch;
    }

    const boxCreate = await Box.create({
      title,
    });

    return boxCreate;
  }
}

export default CreateBoxService;
