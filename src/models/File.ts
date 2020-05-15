import mongoose, { Schema, Document } from 'mongoose';
import { PORT } from '../server';

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
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

File.virtual('url').get(function () {
  return `http://localhost:${PORT}/files/${encodeURIComponent(this.path)}`;
});

export default mongoose.model<FileInterface>('File', File);
