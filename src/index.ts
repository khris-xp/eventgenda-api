import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import projectRouter from '../routes/project.routes';
import mongoose from 'mongoose';
import blogRouter from '../routes/blog.route';
import categoryRouter from '../routes/category.route';
import eventRouter from '../routes/event.route';
import historyRouter from '../routes/history.route';
import locationRouter from '../routes/location.route';
import uploadRouter from '../routes/upload.route';
import userRouter from '../routes/user.route';
dotenv.config();



const app: Express = express();

const port = process.env.PORT ?? 8081;
const URL = process.env.MONGODB_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
  })
);


app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Eventgenda is running!' });
});

app.use('/api/auth', userRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/events', eventRouter);
app.use('/api/location', locationRouter);
app.use('/api/uploads', uploadRouter);
app.use('/api/project', projectRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

mongoose
  .connect(URL as string)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));