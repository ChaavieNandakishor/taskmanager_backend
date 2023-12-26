const logger = require("../log");
const Task = require("../models/task.model");

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
const getTasksByID = async (req, res) => {};
const updateTask = async (req, res) => {};
const deleteTask = async (req, res) => {};

module.exports = {
  createNewTask,
  getAllTasks,
  getTasksByPriority,
  getTasksByID,
  updateTask,
  deleteTask,
};
