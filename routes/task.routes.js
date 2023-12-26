const express=require('express');
const router=express.Router();
const taskControllers=require('../controllers/task.controller')


router.post('/newtask',taskControllers.createNewTask)

module.exports=router;