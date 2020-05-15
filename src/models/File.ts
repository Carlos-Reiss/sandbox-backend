import mongoose, { Schema, Document } from 'mongoose';

interface FileInterface extends Document {
  title: string;
  path: string;
}

const File = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<FileInterface>('File', File);
