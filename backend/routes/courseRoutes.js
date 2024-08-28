const express = require('express');
const router = express.Router();
const { getCourses } = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getCourses);

module.exports = router;
