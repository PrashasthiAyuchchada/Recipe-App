// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';


export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password: hashedPassword, phone });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.status(200).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};
