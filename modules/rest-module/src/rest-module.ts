import { MACModule, MACChannel } from "mac-design-pattern";
import express = require("express");

export class RestModule extends MACModule {
    public static moduleName: string = "Rest";
    #app: any;

    constructor(channelManager: MACChannel) {
        super(channelManager);

        this.name = this.name.bind(this);
        this.listen = this.listen.bind(this);
    }

    name() {
        return RestModule.moduleName;
    }

    listen(routeHandlers: express.Router, listeningPort: number) {
        this.#app = express();
        this.#app.use(express.json()); // for parsing application/json
        this.#app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
        this.#app.use(routeHandlers);
        this.#app.listen(listeningPort);
    }
}
