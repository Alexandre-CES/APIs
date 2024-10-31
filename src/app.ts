import express, { Request, Response } from 'express';
import filesRouter from './modules/files/files.module';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/files', filesRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('APIs');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
