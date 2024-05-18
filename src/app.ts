import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
const app = express();

console.log(process.cwd());

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
})

export default app;


