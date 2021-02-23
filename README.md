# Ultimate AI bot

Covid aware chatbot that handles a simple conversation with a user. The user types in a city, displays the current weather, number of active Covid cases in the country, and a link to learn more about the city.

Built with Typescript and Node/Express. Currently only supports three cities. `Berlin`, `Paris`, and `London`.

The developer documentation is available at `<host-url>/docs` once the app is running.
You can access a sample chatbot expires at `<host-url>` once the app is running.

## Installation steps

Tested with: 

* Node js -> `v15.9.0`
* TypeScript -> `3.7.4`

Please put the following variables in an `.env` file in the root folder: 

* `WEATHER_API_KEY` -> For the weather API requests. [Link to](https://openweathermap.org/appid#example) sign up.
* `RAPID_API_KEY` -> Corona virus data API requests. [Link for](https://docs.rapidapi.com/docs/keys) more info.

## How to run the app

For all types of running, install the node modules via 
```
npm install
```

*Dev mode:*
1. Run `npm run dev`

*Prod mode*
1. Transpile TypeScript code to Javascript by running  `npm run build`
2. Start the node app via `npm run start`

*Test*
1. Run `npm run test` to trigger automated mocha tests

### Data details

This project uses two main APIs to gather the data. 

1. Weather -> [Open Weather Map](https://openweathermap.org/api)
2. Covid cases -> [Repo on rapid API](https://rapidapi.com/Gramzivi/api/covid-19-data?endpoint=apiendpoint_5c132769-7bb2-4000-b320-f42731a7dee3). I'd like to find a more accurate data source


### ToDo

- Add some kind of entity extrator (like duckling) on the users' response to allow users to allow City name extraction from sentences or phrases.
- Research and change the Covid virus API to one with more reliable data (current one says France has 3+ million active Covid)
- Research and build a front end that allows longer dialogue 
- Allow bot to handle non-happy paths (such as are you a bot challenges etc)
- Add tracking (see what missing cities are most request, bounce rates etc)
- Add automated tests to the services 
- Add docker


#### Notes

* The frontend (sample chatbot at `/`) is only a sample and quickly created. It is not intended to be a work of art, but just for demo purposes. It was mostly copied work from this [gist](https://gist.github.com/SferaDev/180876422156cb851b430d88bd18b31e). 
