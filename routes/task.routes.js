const express=require('express');
const router=express.Router();
const taskControllers=require('../controllers/task.controller')


router.post('/newtask',taskControllers.createNewTask)
router.post('/updatetask',taskControllers.updateTask)

module.exports=router;