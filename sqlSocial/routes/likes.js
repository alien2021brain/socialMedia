const express = require('express');
const router = express.Router();
const { getLikes, addLikes, deleteLikes } = require('../controllers/likes.js');
const verifyToken = require('../middleware/JWT.js');

router.get('/:id', getLikes);
router.post('/add', verifyToken, addLikes);
router.delete('/delete/:id', verifyToken, deleteLikes);

module.exports = router;
