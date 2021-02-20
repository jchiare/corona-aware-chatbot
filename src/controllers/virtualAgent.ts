interface VirtualAgentResponse {
    message: string;
}

export default class VirtualAgentController {
    public async getGreeting(): Promise<VirtualAgentResponse> {
        return {
            message: "Hey there, I'm the ultimate.ai Virtual agent. Which city are you looking to learn more about today?",
        };
    }
}