import { Get, Route } from "tsoa";

interface VirtualAgentResponse {
    message: string;
}

@Route("virtualAgent")
export default class VirtualAgentController {
    @Get("/greeting")
    public async getGreeting(): Promise<VirtualAgentResponse> {
        return {
            message: "Hey there, I'm the ultimate.ai Virtual agent. Which city are you looking to learn more about today?",
        };
    }
}