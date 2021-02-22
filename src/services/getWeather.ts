import axios, { AxiosResponse } from "axios";

require('dotenv').config()

type WeatherDescription = {
    id: number;
    main: string;
    description: string;
}

type CurrentWeather = {
    temp: string;
}

interface WeatherDataApiResponse {
    weather: WeatherDescription[];
    main: CurrentWeather;
    statusText: string;
}

export interface WeatherForUserSpecifiedCity {
    shortDescription: WeatherDescription['main'],
    longerDescription: WeatherDescription['description'],
    temperature: CurrentWeather['temp'],
}

export class Weather {

    private WEATHER_API_URL: string = "https://api.openweathermap.org/data/2.5/weather"

    constructor() {
    }

    async getCurrentWeather(city: string): Promise<WeatherForUserSpecifiedCity> {
        // Request to https://openweathermap.org/api
        const response: AxiosResponse<WeatherDataApiResponse> = await axios.get(this.WEATHER_API_URL, {
            "params": {
                q: city,
                appid: process.env.WEATHER_API_KEY,
                units: 'metric'
            }
        })
        if (response.statusText === 'OK') {
            const { weather: weatherDesc, main } = response.data
            return {
                shortDescription: weatherDesc[0].main,
                longerDescription: weatherDesc[0].description,
                temperature: main.temp
            }
        } else {
            throw new Error(`Non 'OK' API request status return from weather API request. 
                HTTP response code: ${response['status']}
                Request URL: ${response['config']['url']}
            `)
        }



    }
}