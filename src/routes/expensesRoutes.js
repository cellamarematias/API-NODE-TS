import { Router } from "express";
import { getExpenses, createExpense, updateExpense, deleteExpense } from "../controllers/expensesController.js";
import authMiddleware from "../middlewares/validations.js";

const router = Router();

router.get("/expenses", getExpenses)
router.post("/expenses", createExpense);
router.patch("/expenses/:id", updateExpense);
router.delete("/expenses/:id", deleteExpense);

export default router;