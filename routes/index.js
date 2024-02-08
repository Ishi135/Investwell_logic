const express = require("express");
const  {loginController, signUpController} =require('../controllers');

const router = express.Router();
router.post('/login', loginController);
router.post('/signup', signUpController);

module.exports = router;