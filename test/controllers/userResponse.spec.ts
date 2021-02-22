import UserResponseController from "../../src/controllers/userResponse"
import { expect } from 'chai';

import 'mocha';

describe('Validate user API requests ', () => {
    it('should allow BERLIN as a valid user message ', async () => {
        const message = {
            text: 'BERLIN'
        }
        const userResponseController = new UserResponseController();
        const result = await userResponseController.userChosenCityResponse(message)
        expect(result).to.have.property('message')
        expect(result).to.have.property('safeToVisit')
        expect(result.message).to.contain('Great city! The weather is currently')
    });
    it('should return 400 Bad request on malformed POST data', async () => {
        const message = {
            notText: 'BERLIN'
        }
        const userResponseController = new UserResponseController();
        // @ts-ignore
        const result = await userResponseController.userChosenCityResponse(message)
        // @ts-ignore
        expect(result.httpResponseCode).to.equal(400)
    });
    it('should not provide information about non-whitelisted cities', async () => {
        const nonWhitelistedCity = 'toronto'
        const message = {
            text: nonWhitelistedCity
        }
        const userResponseController = new UserResponseController();
        const result = await userResponseController.userChosenCityResponse(message)
        expect(result.message).to.contain(`City '${nonWhitelistedCity}' is not current allowed or doesn't exist! Please try another city :)`)
        expect(result).to.not.have.property('safeToVisit')
    });
});