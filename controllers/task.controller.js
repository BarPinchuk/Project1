import {
  createNewTask,
  getTasksByOwner,
  getTaskById,
  updateTask,
  deleteTask,
} from "../services/task.service.js";

export const createTask = (req, res, next) => {
  try {
    const { userId } = req.params;
    const { title, description, priority } = req.body;

    const task = createNewTask({ ownerId: userId, title, description, priority });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const getTasks = (req, res, next) => {
  try {
    const { userId } = req.params;
    const tasks = getTasksByOwner(userId);
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

export const getTask = (req, res, next) => {
  try {
    const { userId, taskId } = req.params;
    const task = getTaskById(userId, taskId);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

export const updateTaskById = (req, res, next) => {
  try {
    const { userId, taskId } = req.params;
    const updates = req.body;

    const task = updateTask(userId, taskId, updates);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

export const deleteTaskById = (req, res, next) => {
  try {
    const { userId, taskId } = req.params;
    const deleted = deleteTask(userId, taskId);
    res.status(200).json({ message: "Task deleted", task: deleted });
  } catch (err) {
    next(err);
  }
};