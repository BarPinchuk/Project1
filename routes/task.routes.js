import { Router } from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTaskById,
  deleteTaskById,
} from "../controllers/task.controller.js";
import { validateBody } from "../middleware/validateBody.middleware.js";

const router = Router();

router.post("/users/:userId/tasks", validateBody(["title", "description", "priority"]), createTask);
router.get("/users/:userId/tasks", getTasks);
router.get("/users/:userId/tasks/:taskId", getTask);
router.put("/users/:userId/tasks/:taskId", updateTaskById);
router.delete("/users/:userId/tasks/:taskId", deleteTaskById);

export default router;