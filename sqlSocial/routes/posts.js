const express = require('express');
const verifyToken = require('../middleware/JWT.js');
const { getPosts, addPosts } = require('../controllers/posts.js');

const router = express.Router();

router.get('/', verifyToken, getPosts);
router.post('/add', verifyToken, addPosts);

module.exports = router;
