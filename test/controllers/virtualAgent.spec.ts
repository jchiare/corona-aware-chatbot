import VirtualAgentController, { greetingMessages } from "../../src/controllers/virtualAgent"
import { expect } from 'chai';

import 'mocha';

describe('Validate virtual agent greetings ', () => {
    it('initial agent message should be one of three options', async () => {
        const controller = new VirtualAgentController();
        const result = await controller.getGreeting();
        expect(result).to.be.an('object').to.have.property('message')
        expect(greetingMessages).to.include.deep.members([{ message: result.message }])
    });
});