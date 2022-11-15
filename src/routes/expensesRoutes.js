import { Router } from "express";
import { getExpenses, createExpense, updateExpense, deleteExpense } from "../controllers/expensesController.js";
import authMiddleware from "../middlewares/validations.js";

const router = Router();

router.get("/expenses", authMiddleware, getExpenses)
router.post("/expenses", authMiddleware, createExpense);
router.patch("/expenses/:id", authMiddleware, updateExpense);
router.delete("/expenses/:id", authMiddleware, deleteExpense);

export default router;