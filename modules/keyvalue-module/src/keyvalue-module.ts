import redis = require("ioredis");
import { MACModule, MACChannel } from "mac-design-pattern";

export class KeyValueModule extends MACModule {

    public static moduleName: string = "Keyvalue";
    #redis: redis.Redis;
    #prefix: string;

    constructor(channelManager: MACChannel, redisConnectionString: string, prefix: string = "D-") {

        super(channelManager);

        this.name = this.name.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.get = this.get.bind(this);

        this.#redis = new redis(redisConnectionString);
        this.#prefix = prefix;

    }

    name() {
        return KeyValueModule.moduleName;
    }

    async add(keyname: string, value: string, ttl: number = 0): Promise<boolean> {
        keyname = this.#prefix + keyname;
        let options: string = (ttl > 0 ? ("EX " + ttl.toString()) : "") + "NX";
        let result = await this.#redis.set(keyname, value, options);
        return result === "OK";
    }

    async update(keyname: string, value: string, ttl: number = 0): Promise<boolean> {
        keyname = this.#prefix + keyname;
        let options: string = (ttl > 0 ? ("EX " + ttl.toString()) : "") + "XX";
        let result = await this.#redis.set(keyname, value, options);
        return result === "OK";
    }

    async get(keyname: string): Promise<string> {
        return await this.#redis.get(keyname);
    }
}
