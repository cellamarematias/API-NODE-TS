import { Router } from "express";
import { getTask, createTasks, updateTask, deleteTask } from "../controllers/tasksController.js";

const router = Router();

router.get("/tasks", getTask)
router.post("/tasks", createTasks);
router.patch("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;