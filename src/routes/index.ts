import express from "express";
import VirtualAgentController from "../controllers/virtualAgent";
import UserResponseController from "../controllers/userResponse";

const router = express.Router();

router.get("/api/virtualAgent/greeting", async (_req, res) => {
    const controller = new VirtualAgentController();
    const response = await controller.getGreeting();
    return res.send(response);
});

router.post("/api/userResponse/message", async (req, res) => {
    const controller = new UserResponseController();
    const response = await controller.userChosenCityResponse(req.body);
    if(response.httpResponseCode){
        return res.status(response.httpResponseCode).send(response)
    }
    return res.send(response);
});


export default router;