// @ts-nocheck
import axios, { AxiosResponse } from "axios";

require('dotenv').config()

type CountryCovidCases = {
    confirmed: number;
    recovered: number;
}

interface CovidApiResponse {
    data: CountryCovidCases[];
    statusText: string;
}

interface SafeToTravelResponse {
    message: string;
    successful: boolean;
}

export class CovidCases {

    private COVID_API_URL: string = "https://covid-19-data.p.rapidapi.com/country/code"
    private RAPID_API_HOST: string = "covid-19-data.p.rapidapi.com"

    public COVID_CASES_SAFE_LIMIT: number = 100000

    date: string;


    constructor() {
        this.date = new Date().toLocaleDateString('en-CA')
    }

    async getActiveCovidCasesByCountryCode(countryCode: string): Promise<SafeToTravelResponse> {
        // Request to https://rapidapi.com/Gramzivi/api/covid-19-data?endpoint=apiendpoint_5c132769-7bb2-4000-b320-f42731a7dee3
        const response: AxiosResponse<CovidApiResponse> = await axios.get(this.COVID_API_URL, {
            'headers': {
                'x-rapidapi-key': process.env.RAPID_API_KEY,
                'x-rapidapi-host': this.RAPID_API_HOST,
                useQueryString: true,
            },
            'params': {
                date: this.date,
                code: countryCode
            }
        })

        if (response.statusText === 'OK') {
            const activeCases: number = response.data[0].confirmed - response.data[0].recovered
            if (activeCases > this.COVID_CASES_SAFE_LIMIT) {
                return {
                    message: `Unfortunately there are ${activeCases} active Covid cases in the country. We recommend waiting another few weeks before checking again`,
                    successful: false
                }
            }
            return {
                message: `Fortunately there are only ${activeCases} active Covid cases in the country - so tourists should be able to visit! `,
                successful: true
            }
        } else {
            throw new Error(`Non 'OK' API request status return from Covid APIrequest. 
                HTTP response code: ${response['status']}
                Request URL: ${response['config']['url']}
            `)
        }



    }
}