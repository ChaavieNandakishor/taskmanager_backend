const express=require('express');
const router=express.Router();
const taskControllers=require('../controllers/task.controller')


router.post('/newtask',taskControllers.createNewTask)
router.post('/updatetask',taskControllers.updateTask)
router.get('/getalltasks',taskControllers.getAllTasks)
router.post('/getbypriority',taskControllers.getTasksByPriority)

module.exports=router;