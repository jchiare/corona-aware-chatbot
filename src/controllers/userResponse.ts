import { Post, Route, Body } from "tsoa";
import { Weather } from "../services/getWeather"
import { CovidCases } from "../services/getCovidCases"

interface UserResponse {
    message: string;
    successful: boolean;
}

interface UserChatMessage {
    text: string;
}

type CityCountry = {
    name: string;
    countryCode: string;
    moreInfo: string;
}

@Route("api/userResponse")
export default class UserResponseController {


    private whitelistedCities: CityCountry[] = [
        { name: 'london', countryCode: 'GB', moreInfo: 'https://www.london.gov.uk/' },
        { name: 'berlin', countryCode: 'DE', moreInfo: 'https://www.visitberlin.de/en/events-berlin' },
        { name: 'paris', countryCode: 'FR', moreInfo: 'https://en.parisinfo.com/' }
    ]

    @Post("/message")
    public async userChosenCityResponse(@Body() message: UserChatMessage): Promise<UserResponse> {
        // do some API calls based on the city
        const { text } = message
        const userSpecifiedCity: CityCountry = this.whitelistedCities.filter(city => city.name === text.toLowerCase())[0]
        if (!userSpecifiedCity) {
            return {
                message: `City '${text}' is not current allowed or doesn't exist! Please try another city :)`,
                successful: false
            }
        }

        const cityWeatherService = new Weather()
        const currentCityWeather = await cityWeatherService.getCurrentWeather(userSpecifiedCity['name'])

        const countryCovidCasesService = new CovidCases()
        const activeCovidCases = await countryCovidCasesService.getActiveCovidCasesByCountryCode(userSpecifiedCity['countryCode'])

        if (!activeCovidCases.successful) {
            return {
                message: `Great city! The weather is currently ${currentCityWeather.longerDescription} and ${currentCityWeather.temperature} degrees celcius. ${activeCovidCases.message}. In any case, you can learn more about this great city here: ${userSpecifiedCity.moreInfo}`,
                successful: false
            }
        }

        return {
            message: `Amazing city :) The weather is currently ${currentCityWeather.longerDescription} and ${currentCityWeather.temperature} degrees celcius. ${activeCovidCases.message}. You can check out some activities in the city before visiting here: ${userSpecifiedCity.moreInfo}. Hope you have a great time :)`,
            successful: true
        }
    }

}