import mongoose, { models } from 'mongoose';

const userSchema = new mongoose.Schema({
  githubId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  githubAccountName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('Users', userSchema, 'user');

export default User;
