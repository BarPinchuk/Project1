import {
  createNewTask,
  getTasksByOwner,
  getTaskById,
  updateTask,
  deleteTask,
} from "../services/task.service.js";

export const createTask = (req, res) => {
  try {
    const { userId } = req.params;
    const { title, description, priority } = req.body;

    const task = createNewTask({ ownerId: userId, title, description, priority });
    res.status(201).json(task);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ message: err.message || "Server error" });
  }
};

export const getTasks = (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = getTasksByOwner(userId);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getTask = (req, res) => {
  try {
    const { userId, taskId } = req.params;
    const task = getTaskById(userId, taskId);
    res.status(200).json(task);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ message: err.message || "Server error" });
  }
};

export const updateTaskById = (req, res) => {
  try {
    const { userId, taskId } = req.params;
    const updates = req.body;

    const task = updateTask(userId, taskId, updates);
    res.status(200).json(task);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ message: err.message || "Server error" });
  }
};

export const deleteTaskById = (req, res) => {
  try {
    const { userId, taskId } = req.params;
    const deleted = deleteTask(userId, taskId);
    res.status(200).json({ message: "Task deleted", task: deleted });
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ message: err.message || "Server error" });
  }
};