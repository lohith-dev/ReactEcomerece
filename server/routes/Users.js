const express=require('express');

const router =express.Router();

const authcontrollers=require('../controllers/User')

const path=require('path');


router.post('/' , authcontrollers.getAuth);

router.post('/signin', authcontrollers.signin);

router.post('/signup', authcontrollers.signup);

module.exports=router;