const express = require("express");
const  {loginController, signUpController, verifyToken, policyDocsController,getPolicyController} =require('../controllers');
const router = express.Router();
router.post('/login', loginController);
router.post('/signup', signUpController);
router.get('/home', verifyToken);
router.get('/policydoc', policyDocsController);
router.get('/getpolicyData', getPolicyController);

module.exports = router;