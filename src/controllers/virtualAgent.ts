import { Get, Route } from "tsoa";

interface VirtualAgentResponse {
    message: string;
}

@Route("api/virtualAgent")
export default class VirtualAgentController {

    @Get("/greeting")
    public async getGreeting(): Promise<VirtualAgentResponse> {

        function getRandomNumInRange(num: number): number {
            return Math.floor(Math.random() * num)
        }

        const greetingMessages: Array<VirtualAgentResponse> = [
            {
                message: "Hey there, I'm the ultimate.ai Virtual agent. Which city are you looking to learn more about today?"
            },
            {
                message: "Welcome to the ultimate ai Virtual agent :) - I'm here to help you plan your next trip! Which city are you interested in?"
            },
            {
                message: "Hi there! Looking to travel somewhere new? Just type a city name and I'll give you the downlow on the city"
            }
        ]

        return greetingMessages[getRandomNumInRange(greetingMessages.length)]
    }
}