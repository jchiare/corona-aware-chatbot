import express from "express";
import VirtualAgentController from "../controllers/virtualAgent";

const router = express.Router();

router.get("/virtualAgent/greeting", async (_req, res) => {
    const controller = new VirtualAgentController();
    const response = await controller.getGreeting();
    return res.send(response);
});

export default router;