import { Post, Route, Body } from "tsoa";
import { Weather, WeatherForUserSpecifiedCity } from "../services/getWeather"

interface UserResponse {
    message: string|WeatherForUserSpecifiedCity;
    successful: boolean;
}

interface UserMessage {
    text: string;
}


@Route("api/userResponse")
export default class UserResponseController {


    private whitelistedCities: string[] = ['london', 'berlin', 'paris']

    @Post("/message")
    public async userChosenCityResponse(@Body() message: UserMessage): Promise<UserResponse> {
        // do some API calls based on the city
        const { text } = message
        if (!this.whitelistedCities.includes(text.toLowerCase())) {
            return {
                message: `City '${text}' is not current allowed. Please try another city`,
                successful: false
            }
        }

        const cityWeather = new Weather(text)
        const value = await cityWeather.getCurrentWeather()
        return {
            message: value,
            successful: true
        };
    }

}