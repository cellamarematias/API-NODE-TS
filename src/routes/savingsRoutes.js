import { Router } from "express";
import { getSavings, createSaving, updateSaving, deleteSaving } from "../controllers/savingsController.js";
import authMiddleware from "../middlewares/validations.js";

const router = Router();

router.get("/savings", authMiddleware, getSavings)
router.post("/savings", authMiddleware, createSaving);
router.patch("/savings/:id", authMiddleware, updateSaving);
router.delete("/savings/:id", authMiddleware, deleteSaving);

export default router;