const express = require('express');
const connectDB = require('./db');
const User = require('./User');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

// Register user
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login user
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user by email
app.get('/api/user/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
