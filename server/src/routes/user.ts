import express, { Express, Request, Response } from 'express';
import User from '../models/users';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find({});
    res.send(allUsers);
  } catch (err) {
    res.send(err);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const checkUser = await User.findOne({ githubId: req.body.githubId });
    if (checkUser) {
      res.send({ message: 'user already present' });
      return;
    }
    const newUser = await User.create(req.body);
    res.send({ message: 'user added' });
  } catch (err) {
    res.send(err);
  }
});

export { router };
