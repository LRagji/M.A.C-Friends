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
var _redisConnectionString, _channels, _maxMessageLimit;
Object.defineProperty(exports, "__esModule", { value: true });
const mac_design_pattern_1 = require("mac-design-pattern");
const redis_streams_broker_1 = require("redis-streams-broker");
const shortid_1 = require("shortid");
const keyName = "A";
const defaultGroupName = "Default";
class RedisChannel extends mac_design_pattern_1.MACChannel {
    constructor(redisConnectionString, maxMessageLimit) {
        super();
        _redisConnectionString.set(this, void 0);
        _channels.set(this, void 0);
        _maxMessageLimit.set(this, void 0);
        __classPrivateFieldSet(this, _redisConnectionString, redisConnectionString);
        this.registerModule = this.registerModule.bind(this);
        this.teleport = this.teleport.bind(this);
        __classPrivateFieldSet(this, _channels, new Map());
        __classPrivateFieldSet(this, _maxMessageLimit, maxMessageLimit);
    }
    registerModule(channelName, onActorReceivedHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let channel = __classPrivateFieldGet(this, _channels).get(channelName);
            if (channel == undefined) {
                channel = new redis_streams_broker_1.default(__classPrivateFieldGet(this, _redisConnectionString), channelName);
                __classPrivateFieldGet(this, _channels).set(channelName, channel);
            }
            const actorBuilderWrapper = (serializedActors) => __awaiter(this, void 0, void 0, function* () {
                for (let idx = 0; idx < serializedActors.length; idx++) {
                    const message = serializedActors[idx];
                    yield onActorReceivedHandler(this.deserialize(message.payload[keyName]));
                    yield message.markAsRead();
                }
                ;
            });
            const cg = yield channel.joinConsumerGroup(defaultGroupName);
            return yield cg.subscribe(shortid_1.default.generate(), actorBuilderWrapper);
        });
    }
    teleport(channelName, actor) {
        return __awaiter(this, void 0, void 0, function* () {
            if (__classPrivateFieldGet(this, _channels).has(channelName)) {
                const payload = { keyName: yield this.serialize(actor) };
                yield __classPrivateFieldGet(this, _channels).get(channelName).publish(payload, __classPrivateFieldGet(this, _maxMessageLimit));
                return true;
            }
            return false;
        });
    }
}
exports.RedisChannel = RedisChannel;
_redisConnectionString = new WeakMap(), _channels = new WeakMap(), _maxMessageLimit = new WeakMap();
