import { MACChannel, MACActor } from "mac-design-pattern";

export class SimpleChannel extends MACChannel {
    #channelMap: Map<string, any>;

    constructor() {
        super();
        this.registerModule = this.registerModule.bind(this);
        this.teleport = this.teleport.bind(this);
        this.#channelMap = new Map<string, any>();
    }

    async registerModule(channelName: string, onActorReceivedHandler: (actor: MACActor) => Promise<boolean>): Promise<boolean> {
        const handler = async (serializedActor) => {
            const actor = this.deserialize(serializedActor);
            await onActorReceivedHandler(actor);
        }
        this.#channelMap.set(channelName, handler);
        return true;
    }

    async teleport(channelName: string, actor: MACActor): Promise<boolean> {
        if (this.#channelMap.has(channelName)) {
            const serializedActor = this.serialize(actor);
            this.#channelMap.get(channelName)(serializedActor);
            return true;
        }
        return false;
    }

}