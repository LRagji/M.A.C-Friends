"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _app;
Object.defineProperty(exports, "__esModule", { value: true });
const mac_design_pattern_1 = require("mac-design-pattern");
const express = require("express");
class RestModule extends mac_design_pattern_1.MACModule {
    constructor(channelManager) {
        super(channelManager);
        _app.set(this, void 0);
        this.name = this.name.bind(this);
        this.listen = this.listen.bind(this);
    }
    name() {
        return RestModule.moduleName;
    }
    listen(routeHandlers, listeningPort) {
        __classPrivateFieldSet(this, _app, express());
        __classPrivateFieldGet(this, _app).use(express.json()); // for parsing application/json
        __classPrivateFieldGet(this, _app).use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
        __classPrivateFieldGet(this, _app).use(routeHandlers);
        __classPrivateFieldGet(this, _app).listen(listeningPort);
    }
}
exports.RestModule = RestModule;
_app = new WeakMap();
RestModule.moduleName = "Rest";
