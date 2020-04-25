import { MACModule, MACChannel } from "mac-design-pattern";
import { Request, Response, express } from "express";
const ModuleName = "Rest";

export class RestModule extends MACModule {
    #app: any;
    #instructionsResolver: ((instructionSetId: number) => Promise<((module: MACModule) => Promise<string | boolean>)[]>);
    constructor(channelManager: MACChannel, listeningPort: number,
        interceptor: (request: Request, response: Response, next: any) => {}, routeHandlers: express,
        instructionsResolver: ((instructionSetId: number) => Promise<((module: MACModule) => Promise<string | boolean>)[]>)) {
        super(channelManager);

        this.name = this.name.bind(this);
        this.#instructionsResolver = instructionsResolver;

        this.#app = express();
        this.#app.use(express.json()); // for parsing application/json
        this.#app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

        this.#app.use((request: Request, response: Response, next: any) => {
            request.processCommand = this.processNewActor;
            next();
        })

        if (interceptor !== undefined) {
            this.#app.use(interceptor);
        }

        this.#app.use(routeHandlers);
        this.#app.listen(listeningPort);
    }

    name() {
        return ModuleName;
    }

    async templateResolver(templateId) {
        return await this.#instructionsResolver(templateId);
    }
}
