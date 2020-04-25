"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var _app, _instructionsResolver;
Object.defineProperty(exports, "__esModule", { value: true });
const mac_design_pattern_1 = require("mac-design-pattern");
const express_1 = require("express");
const ModuleName = "Rest";
class RestModule extends mac_design_pattern_1.MACModule {
    constructor(channelManager, listeningPort, interceptor, routeHandlers, instructionsResolver) {
        super(channelManager);
        _app.set(this, void 0);
        _instructionsResolver.set(this, void 0);
        this.name = this.name.bind(this);
        __classPrivateFieldSet(this, _instructionsResolver, instructionsResolver);
        __classPrivateFieldSet(this, _app, express_1.express());
        __classPrivateFieldGet(this, _app).use(express_1.express.json()); // for parsing application/json
        __classPrivateFieldGet(this, _app).use(express_1.express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
        __classPrivateFieldGet(this, _app).use((request, response, next) => {
            request.processCommand = this.processNewActor;
            next();
        });
        if (interceptor !== undefined) {
            __classPrivateFieldGet(this, _app).use(interceptor);
        }
        __classPrivateFieldGet(this, _app).use(routeHandlers);
        __classPrivateFieldGet(this, _app).listen(listeningPort);
    }
    name() {
        return ModuleName;
    }
    templateResolver(templateId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield __classPrivateFieldGet(this, _instructionsResolver).call(this, templateId);
        });
    }
}
exports.RestModule = RestModule;
_app = new WeakMap(), _instructionsResolver = new WeakMap();
