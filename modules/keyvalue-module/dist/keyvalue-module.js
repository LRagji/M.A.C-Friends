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
var _redis, _prefix;
Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("ioredis");
const mac_design_pattern_1 = require("mac-design-pattern");
class KeyValueModule extends mac_design_pattern_1.MACModule {
    constructor(channelManager, redisConnectionString, prefix = "D-") {
        super(channelManager);
        _redis.set(this, void 0);
        _prefix.set(this, void 0);
        this.name = this.name.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.get = this.get.bind(this);
        __classPrivateFieldSet(this, _redis, new redis(redisConnectionString));
        __classPrivateFieldSet(this, _prefix, prefix);
    }
    name() {
        return KeyValueModule.moduleName;
    }
    add(keyname, value, ttl = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            keyname = __classPrivateFieldGet(this, _prefix) + keyname;
            let options = (ttl > 0 ? ("EX " + ttl.toString()) : "") + "NX";
            let result = yield __classPrivateFieldGet(this, _redis).set(keyname, value, options);
            return result === "OK";
        });
    }
    update(keyname, value, ttl = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            keyname = __classPrivateFieldGet(this, _prefix) + keyname;
            let options = (ttl > 0 ? ("EX " + ttl.toString()) : "") + "XX";
            let result = yield __classPrivateFieldGet(this, _redis).set(keyname, value, options);
            return result === "OK";
        });
    }
    get(keyname) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield __classPrivateFieldGet(this, _redis).get(keyname);
        });
    }
}
exports.KeyValueModule = KeyValueModule;
_redis = new WeakMap(), _prefix = new WeakMap();
KeyValueModule.moduleName = "Keyvalue";
