import express, { Express, Request, Response } from 'express';
import { router as userRouter } from './routes/user';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/api', (req: Request, res: Response) => {
  try {
    res.send('working');
  } catch (err) {
    console.log(err);
  }
});

mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI as string;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log('connected to mongoDB');
}

app.use('/api/user', userRouter);

app.listen(port, () => {
  console.log('Server is running');
});
