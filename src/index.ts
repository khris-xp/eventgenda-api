import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import blogRouter from '../routes/blog.route';
import userRouter from '../routes/user.route';
import locationRouter from '../routes/location.route';
import eventRuleRouter from '../routes/eventRule.route';
import paymentRouter from '../routes/payment.route';
import eventRouter from '../routes/event.route';

dotenv.config();

const app: Express = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);


const port = process.env.PORT || 8081;
const URL = process.env.MONGODB_URI;

// Connect to mongodb
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Eventgenda is running!' });
});
mongoose
  .connect(URL as string)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/auth', userRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/location', locationRouter);
app.use('/api/v1/eventRule', eventRuleRouter);
app.use('/api/payment', paymentRouter);
app.use('api/event', eventRouter);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

