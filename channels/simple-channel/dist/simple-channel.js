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
var _channelMap;
Object.defineProperty(exports, "__esModule", { value: true });
const mac_design_pattern_1 = require("mac-design-pattern");
class SimpleChannel extends mac_design_pattern_1.MACChannel {
    constructor() {
        super();
        _channelMap.set(this, void 0);
        this.registerModule = this.registerModule.bind(this);
        this.teleport = this.teleport.bind(this);
        __classPrivateFieldSet(this, _channelMap, new Map());
    }
    registerModule(channelName, onActorReceivedHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            const handler = (serializedActor) => __awaiter(this, void 0, void 0, function* () {
                const actor = this.deserialize(serializedActor);
                yield onActorReceivedHandler(actor);
            });
            __classPrivateFieldGet(this, _channelMap).set(channelName, handler);
            return true;
        });
    }
    teleport(channelName, actor) {
        return __awaiter(this, void 0, void 0, function* () {
            if (__classPrivateFieldGet(this, _channelMap).has(channelName)) {
                const serializedActor = this.serialize(actor);
                __classPrivateFieldGet(this, _channelMap).get(channelName)(serializedActor);
                return true;
            }
            return false;
        });
    }
}
exports.SimpleChannel = SimpleChannel;
_channelMap = new WeakMap();
