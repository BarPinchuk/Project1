import { Router } from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTaskById,
  deleteTaskById,
} from "../controllers/task.controller.js";

const router = Router();

router.post("/api/users/:userId/tasks", createTask);
router.get("/api/users/:userId/tasks", getTasks);
router.get("/api/users/:userId/tasks/:taskId", getTask);
router.put("/api/users/:userId/tasks/:taskId", updateTaskById);
router.delete("/api/users/:userId/tasks/:taskId", deleteTaskById);

export default router;
