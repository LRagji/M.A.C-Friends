import { MACChannel, MACActor } from "mac-design-pattern";
export declare class RedisChannel extends MACChannel {
    #private;
    constructor(redisConnectionString: string, maxMessageLimit: number);
    registerModule(channelName: string, onActorReceivedHandler: (actor: MACActor) => Promise<boolean>): Promise<any>;
    teleport(channelName: string, actor: MACActor): Promise<boolean>;
}
