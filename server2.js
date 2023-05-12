const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Create user schema and model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Create express app
const app = express();

// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());

// Define login route
app.post('/login', async (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  // If user doesn't exist, return 401 Unauthorized status
  if (!user) {
    return res.status(401).send('Invalid email or password');
  }

  // Check if password is correct
  const validPassword = await bcrypt.compare(password, user.password);

  // If password is incorrect, return 401 Unauthorized status
  if (!validPassword) {
    return res.status(401).send('Invalid email or password');
  }

  // If email and password are correct, return 200 OK status and user data
  res.status(200).send(user);
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));
