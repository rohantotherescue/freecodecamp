const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { name, email_id, password } = req.body;
  console.log(req.body);
  try {
    let user = await User.findOne({ email_id });
    if (user) {
      return res.status(400).json({ message: 'Email id already exists' });
    }

    user = new User({ name, email_id, password });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error'+ err.message });
  }
};

exports.login = async (req, res) => {
  const { email_id, password } = req.body;
  try {
    console.log("sneed")
    console.log(req.body);
    const user = await User.findOne({ email_id });
    console.log("\n",user);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10s' }); //TODO change this to 1h
    console.log('Generated Token:', token); // Log token for debugging
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
