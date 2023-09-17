const express = require('express');
const verifyToken = require('../middleware/JWT.js');
const router = express.Router();
const {
  getFollower,
  addFollower,
  deleteFollower,
} = require('../controllers/follower.js');

router.get('/:id', verifyToken, getFollower);
router.post('/follow/:id', verifyToken, addFollower);
router.delete('/unfollow/:id', verifyToken, deleteFollower);
module.exports = router;
