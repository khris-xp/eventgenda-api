import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import projectRouter from '../routes/project.routes';
import mongoose from 'mongoose';

dotenv.config();



const app: Express = express();
const port = process.env.PORT ?? 8081;
const URL = process.env.MONGODB_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' });
});

app.use('/api/project', projectRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

mongoose
  .connect(URL as string)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));