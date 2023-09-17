const { comments, addCommments } = require('../controllers/comments.js');
const express = require('express');
const router = express.Router();
const verify = require('../middleware/JWT.js');

router.get('/:id', comments);
router.post('/add', verify, addCommments);

module.exports = router;
