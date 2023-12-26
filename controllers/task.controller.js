const logger = require("../log");
const Task = require("../models/task.model");

const createNewTask = async (req, res) => {
    console.log("api running")
  try {
    const { title, description, dueDate, priority, owner } = req.body;
    if (!title || !dueDate) {
      const error = "title and duedate required";
      logger.error(error);
      return res.status(400).json({
        error: error,
      });
    }

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      owner,
    })
    console.log(task)
    await task.save()
    res.status(200).json({
      success: true,
      message: "task added",
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllTasks = async (req, res) => {};
const getTasksByPriority = async (req, res) => {};
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
