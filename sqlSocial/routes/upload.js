const express = require('express');
const router = express.Router();
const { uploadSingle } = require('../controllers/upload.js');
const upload = require('../middleware/Multer.js');
const verify = require('../middleware/JWT.js');
router.post('/single', upload.single('profile'), uploadSingle);
router.post('/post', verify, upload.single('image'), uploadSingle);
module.exports = router;
