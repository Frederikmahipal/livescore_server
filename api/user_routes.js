import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const existingUser = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Email or username already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while registering the user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [
        { email: req.body.email },
        { username: req.body.email }
      ]
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email/username or password' });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email/username or password' });
    }

    //REMOVE THIS?
    res.cookie('session_id', req.session.id, { httpOnly: true, secure: true, sameSite: 'strict' });
    req.session.userId = user._id;

    res.json({ message: 'Logged in successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
});




router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while logging out' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

// Delete route
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
});

export default router; 