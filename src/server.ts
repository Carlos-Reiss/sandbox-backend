import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import AppError from './errors/AppError';
import connect from './connect';
import Routes from './routes';

const app = express();

app.use(express.json());
// uploads de arquivos
app.use(express.urlencoded({ extended: true }));
// connect database
const db =
  'mongodb+srv://omnistack:omnistack@cluster0-si4dk.mongodb.net/sandbox?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';

connect(db);

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

const PORT = 3331;

app.listen(PORT, () => {
  console.log(`Server Running...${PORT}`);
});
