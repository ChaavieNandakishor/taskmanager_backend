const logger = require("../log");
const Task = require("../models/task.model");
const User = require("../models/user.model");

const createNewTask = async (req, res) => {
  console.log("api running");
  try {
    const { title, description, dueDate, priority, owner } = req.body;
    if (!title || !dueDate) {
      const errorMessage = "title and duedate required";
      logger.error(errorMessage);
      return res.status(400).json({
        error: errorMessage,
      });
    }

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      owner,
    });
    console.log(task);
    await task.save();
    res.status(200).json({
      success: true,
      message: "task added",
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().select(
      "title description dueDate completed priority"
    );
    res.send(tasks);
  } catch (err) {}
};
const getTasksByPriority = async (req, res) => {
  try {
    const { priority } = req.body;
    if (!priority) {
      const errorMessage = "priority required";
      logger.error(errorMessage);
      return res.status(400).json({ success: false, message: errorMessage });
    }
    const response = await Task.find({
      priority: { $regex: priority, $options: "i" },
    });
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const getTasksByUserID = async (req, res) => {
  // res.send(req.user);
  try {
    const { userId } = req.user;
    const userTasks = await Task.find({ owner: userId });
    if (userTasks.length === 0) {
      const responseText = "no tasks found for the user";
      return res.status(400).json({
        success: false,
        message: responseText,
      });
    }
    res.status(200).json({
      success: true,
      message: "fetched user tasks successfully",
      data: userTasks,
    });
    res.send(userTasks);
  } catch (err) {}
};
const updateTask = async (req, res) => {
  try {
    const taskId = req.body.taskId;
    const task=await Task.findOneAndUpdate(
      {_id:taskId},
    )
  } catch {}
};
const deleteTask = async (req, res) => {};

module.exports = {
  createNewTask,
  getAllTasks,
  getTasksByPriority,
  getTasksByUserID,
  updateTask,
  deleteTask,
};
