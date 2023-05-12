const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Create a schema for user data
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  country: String
});

// Create a user model based on the schema
const User = mongoose.model('User', userSchema);

// Set up body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Handle form submission
app.post('/register', (req, res) => {
  const { email, password, country } = req.body;

  // Check if user already exists
  User.findOne({ email }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Server error');
    }

    if (user) {
      return res.status(400).send('User already exists');
    }

    // Create new user
    const newUser = new User({
      email,
      password,
      country
    });

    // Save user to database
    newUser.save((err) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Server error');
      }

      // Redirect user to login page
      res.redirect('/login');
    });
  });
});

// Start the server
app.listen(3000, () => console.log('Server started'));
