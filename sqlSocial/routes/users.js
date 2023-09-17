var express = require('express');
var router = express.Router();
const verifyToken = require('../middleware/JWT.js');
const { users, singleUsers, updateUser } = require('../controllers/users.js');
/* GET users listing. */
router.get('/', verifyToken, users);
router.get('/find/:id', verifyToken, singleUsers);
router.put('/', verifyToken, updateUser);

module.exports = router;
