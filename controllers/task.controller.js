const logger = require("../log");
const Task = require("../models/task.model");
const User = require("../models/user.model");

const createNewTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, category } = req.body;
    const owner = req.user.userId;
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
      category,
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
    const userId = req.user.userId;
    const { priority } = req.body;
    if (!priority) {
      const errorMessage = "priority required";
      logger.error(errorMessage);
      return res.status(400).json({ success: false, message: errorMessage });
    }
    const response = await Task.find({
      priority: { $regex: priority, $options: "i" },
      owner: userId,
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
const getTasksByCategory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const category = req.body.category;
    if (!category) {
      const errorMsg = "category required";
      logger.error(errorMsg);
      return res.status(400).json({
        success: false,
        message: errorMsg,
      });
    }
    console.log("the user id is", userId);
    const response = await Task.find({ owner: userId, category: category });
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      error: "Internal server error",
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
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const updateTask = async (req, res) => {
  try {
    const { userId } = req.user;
    const { taskId, updatedFields } = req.body;
    if (!taskId || !updatedFields) {
      const errorText = "taskId and updatedFields required";
      logger.error(errorText);
      return res.status(400).json({
        success: false,
        message: errorText,
      });
    }
    const task = await Task.findOneAndUpdate(
      { _id: taskId, owner: userId },
      { $set: updatedFields }
      // { new: true } //can be used for returning updated doc
    );
    if (!task) {
      const errorText = "task not found";
      logger.error(errorText);
      return res.status(400).json({
        success: false,
        message: errorText,
      });
    }

    return res.status(200).json({
      success: true,
      message: "task updated successfully",
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.body;
    if (!taskId) {
      const errorText = "task id required";
      logger.error(errorText);
      return res.status(400).json({
        success: false,
        message: errorText,
      });
    }
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      // data: deletedTask,
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createNewTask,
  getAllTasks,
  getTasksByPriority,
  getTasksByCategory,
  getTasksByUserID,
  updateTask,
  deleteTask,
};
