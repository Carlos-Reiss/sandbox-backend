import mongoose, { Document } from 'mongoose';

interface BoxInterface extends Document {
  title: string;
  files: [];
}

const Box = new mongoose.Schema<BoxInterface>(
  {
    title: {
      type: String,
      required: true,
    },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<BoxInterface>('box', Box);
