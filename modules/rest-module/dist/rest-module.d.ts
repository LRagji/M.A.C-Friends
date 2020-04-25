import { MACModule, MACChannel } from "mac-design-pattern";
import { Request, Response, express } from "express";
export declare class RestModule extends MACModule {
    #private;
    constructor(channelManager: MACChannel, listeningPort: number, interceptor: (request: Request, response: Response, next: any) => {}, routeHandlers: express, instructionsResolver: ((instructionSetId: number) => Promise<((module: MACModule) => Promise<string | boolean>)[]>));
    name(): string;
    templateResolver(templateId: any): Promise<((module: MACModule) => Promise<string | boolean>)[]>;
}
