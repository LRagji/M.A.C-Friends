const assert = require('assert');
const sinon = require('sinon');
const mac = require("mac-design-pattern");
const targetType = require('../dist/http-module').HttpModule;

describe('Http Module Tests', function () {


    it('Should be able to use get method', async function () {
        const registerModuleSpy = sinon.spy();
        const teleportSpy = sinon.spy();
        const testChannel = new TestChannel(registerModuleSpy, teleportSpy);
        const target = new targetType(testChannel);
        const options = {
            uri: "https://cat-fact.herokuapp.com/facts", // I didnt have a better api 
            method: "GET",
            successCode: 200
        };
        const result = await target.requestJson(options);
        assert.notDeepEqual(result, undefined);
        assert.deepEqual(registerModuleSpy.callCount,1);
    });

});

class TestChannel extends mac.MACChannel {

    constructor(registerModuleSpy, teleportSpy) {
        super();
        this.teleport = teleportSpy;
        this.registerModule = registerModuleSpy;
    }

    registerModule() {

    }
    teleport() {

    }
}