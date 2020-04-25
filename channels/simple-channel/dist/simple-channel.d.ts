import { MACChannel, MACActor } from "mac-design-pattern";
export declare class SimpleChannel extends MACChannel {
    #private;
    constructor();
    registerModule(channelName: string, onActorReceivedHandler: (actor: MACActor) => Promise<boolean>): Promise<boolean>;
    teleport(channelName: string, actor: MACActor): Promise<boolean>;
}
