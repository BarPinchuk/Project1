import { Router } from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTaskById,
  deleteTaskById,
} from "../controllers/task.controller.js";

const router = Router({ mergeParams: true });

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:taskId", getTask);
router.put("/:taskId", updateTaskById);
router.delete("/:taskId", deleteTaskById);

export default router;
