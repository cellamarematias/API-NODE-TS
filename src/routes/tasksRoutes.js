import { Router } from "express";
import { getTask, createTasks, updateTask, deleteTask } from "../controllers/tasksController.js";
import authMiddleware from "../middlewares/validations.js";

const router = Router();

router.get("/tasks", authMiddleware, getTask)
router.post("/tasks", authMiddleware, createTasks);
router.patch("/tasks/:id", authMiddleware, updateTask);
router.delete("/tasks/:id", authMiddleware, deleteTask);

export default router;