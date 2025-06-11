// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favorites: [
    {
      id: String,
      name: String,
      image: String,
      category: String,
    }
  ],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
