import * as rp from "bent";
import { MACModule, MACChannel } from "mac-design-pattern";

export class HttpModule extends MACModule {
    public static moduleName: string = "Http";

    constructor(channelManager: MACChannel) {
        super(channelManager);

        this.name = this.name.bind(this);
        this.requestJson = this.requestJson.bind(this);
        this.requestString = this.requestString.bind(this);
        this.requestBuffer = this.requestBuffer.bind(this);
    }

    name() {
        return HttpModule.moduleName;
    }

    async requestJson(options: RequestOptions): Promise<any> {
        const request = rp(options.method, "json", options.successCode);
        return await request(options.uri, options.body);
    }
    async requestString(options: RequestOptions): Promise<any> {
        const request = rp(options.method, "string", options.successCode);
        return await request(options.uri, options.body);
    }
    async requestBuffer(options: RequestOptions): Promise<any> {
        const request = rp(options.method, "buffer", options.successCode);
        return await request(options.uri, options.body);
    }
}

export interface RequestOptions {
    uri: string,
    method: string,
    headers: any;
    body: any,
    successCode: number
}
