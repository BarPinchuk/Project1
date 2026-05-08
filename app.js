import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import taskRouter from "./src/routes/task.routes.js";

dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users/:userId/tasks", taskRouter);