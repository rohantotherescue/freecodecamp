const Course = require('../models/Course');

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 }).limit(5);
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
