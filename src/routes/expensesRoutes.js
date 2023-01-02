import { Router } from "express";
import { getExpenses, createExpense, updateExpense, deleteExpense, balance } from "../controllers/expensesController.js";
import authMiddleware from "../middlewares/validations.js";

const router = Router();

router.get("/expenses", authMiddleware, getExpenses)
router.post("/expenses", authMiddleware, createExpense);
router.patch("/expenses/:id", authMiddleware, updateExpense);
router.patch("/expenses/", authMiddleware, balance);
router.delete("/expenses/:id", authMiddleware, deleteExpense);

export default router;