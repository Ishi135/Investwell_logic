const express = require("express");
const  {loginController, signUpController, verifyToken} =require('../controllers');
const router = express.Router();
router.post('/login', loginController);
router.post('/signup', signUpController);
router.get('/home', verifyToken);
module.exports = router;