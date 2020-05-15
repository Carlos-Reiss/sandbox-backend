import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import Socket from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';

import uploadConfig from './config/multer';
import AppError from './errors/AppError';
import connect from './connect';
import Routes from './routes';

const app = express();
app.use(cors());
// socket.io
const server = createServer(app);
const io = Socket(server);

io.on('connection', socket => {
  socket.on('connectRoon', box => {
    socket.join(box);
  });
});

app.use(express.json());
// uploads de arquivos
app.use(express.urlencoded({ extended: true }));
// connect database
const db =
  'mongodb+srv://omnistack:omnistack@cluster0-si4dk.mongodb.net/sandbox?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';

connect(db);
app.use('/files', express.static(uploadConfig.directory));

app.use((req: Request, res: Response, next: NextFunction) => {
  req.io = io;

  return next();
});
// minhas rotas
app.use(Routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'Error', message: err.message });
  }
  console.log(err);
  return res.status(500).json({ status: 'error', message: err.message });
});

export const PORT = process.env.PORT || 3333;

server.listen(PORT, () => {
  console.log(`Server Running...${PORT}`);
});
