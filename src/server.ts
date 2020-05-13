import express from 'express';
import connect from './connect';
import Routes from './routes';

const app = express();

app.use(express.json());
// uploads de arquivos
app.use(express.urlencoded({ extended: true }));
// connect database
const db =
  'mongodb+srv://omnistack:omnistack@cluster0-si4dk.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';

connect(db);

// minhas rotas
app.use(Routes);

const PORT = 3331;

app.listen(PORT, () => {
  console.log(`Server Running...${PORT}`);
});
