import { Router } from "express";
import { getSavings, createSaving, updateSaving, deleteSaving } from "../controllers/savingsController.js";

const router = Router();

router.get("/savings", getSavings)
router.post("/savings", createSaving);
router.patch("/savings/:id", updateSaving);
router.delete("/savings/:id", deleteSaving);

export default router;