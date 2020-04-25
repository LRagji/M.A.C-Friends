import { MACModule, MACChannel } from "mac-design-pattern";
import express = require("express");
export declare class RestModule extends MACModule {
    #private;
    static moduleName: string;
    constructor(channelManager: MACChannel);
    name(): string;
    listen(routeHandlers: express.Router, listeningPort: number): void;
}
