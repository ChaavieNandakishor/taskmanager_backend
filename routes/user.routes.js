const express=require('express');
const router=express.Router();
const userControllers=require('../controllers/user.controller')


router.post("/registration",userControllers.userRegistraion)

module.exports=router