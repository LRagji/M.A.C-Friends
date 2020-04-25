import { MACChannel, MACActor } from "mac-design-pattern";
import redisStreamBrokerType from "redis-streams-broker";
import shortid from 'shortid';
const keyName = "A";
const defaultGroupName = "Default";

export class RedisChannel extends MACChannel {
    #redisConnectionString: string;
    #channels: Map<string, any>;
    #maxMessageLimit: number;

    constructor(redisConnectionString: string, maxMessageLimit: number) {
        super();
        this.#redisConnectionString = redisConnectionString;
        this.registerModule = this.registerModule.bind(this);
        this.teleport = this.teleport.bind(this);
        this.#channels = new Map();
        this.#maxMessageLimit = maxMessageLimit;
    }

    async registerModule(channelName:string, onActorReceivedHandler:(actor: MACActor) => Promise<boolean>) {
        let channel = this.#channels.get(channelName);
        if (channel == undefined) {
            channel = new redisStreamBrokerType(this.#redisConnectionString, channelName);
            this.#channels.set(channelName, channel);
        }
        const actorBuilderWrapper = async (serializedActors) => {
            for (let idx = 0; idx < serializedActors.length; idx++) {
                const message = serializedActors[idx];
                await onActorReceivedHandler(this.deserialize(message.payload[keyName]));
                await message.markAsRead();
            };
        }
        const cg = await channel.joinConsumerGroup(defaultGroupName);
        return await cg.subscribe(shortid.generate(), actorBuilderWrapper);
    }

    async teleport(channelName: string, actor: MACActor): Promise<boolean> {
        if (this.#channels.has(channelName)) {
            const payload = { keyName: await this.serialize(actor) };
            await this.#channels.get(channelName).publish(payload, this.#maxMessageLimit);
            return true;
        }
        return false;
    }

}
