import { MACModule, MACChannel } from "mac-design-pattern";
export declare class KeyValueModule extends MACModule {
    #private;
    static moduleName: string;
    constructor(channelManager: MACChannel, redisConnectionString: string, prefix?: string);
    name(): string;
    add(keyname: string, value: string, ttl?: number): Promise<boolean>;
    update(keyname: string, value: string, ttl?: number): Promise<boolean>;
    get(keyname: string): Promise<string>;
}
