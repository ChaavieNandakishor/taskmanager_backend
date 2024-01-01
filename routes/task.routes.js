const express=require('express');
const router=express.Router();
const taskControllers=require('../controllers/task.controller')


router.post('/newtask',taskControllers.createNewTask)
router.post('/updatetask',taskControllers.updateTask)
router.get('/getalltasks',taskControllers.getAllTasks)
router.post('/getbypriority',taskControllers.getTasksByPriority)
router.post('/getusertasks',taskControllers.getTasksByUserID)
router.post('/updatetask',taskControllers.updateTask)
router.post('/delete',taskControllers.deleteTask)
router.post('/filterbycategory',taskControllers.getTasksByCategory)

module.exports=router;