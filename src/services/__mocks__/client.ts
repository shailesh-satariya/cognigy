import {EventEmitter} from "events";
import {v4 as uuidv4} from "uuid";

class Client extends EventEmitter {
    private _count = 0;

    public async connect() {
        return Promise.resolve();
    }

    public disconnect() {
        this.removeAllListeners();
    }

    public sendMessage(text: string, data?: any): Client {
        const count = this._count;
        setTimeout(() => {
            if (count === 0) {
                this.emitOutput(`Hello there!`);
            }
            this.emitOutput(`You said: ${text}`);
        }, 1000);

        this._count++;
        return this;
    }

    private emitOutput(text: string) {
        this.emit("output", {
            data: {},
            source: "bot",
            disableSensitiveLogging: false,
            text: text,
            traceId: `endpoint-realtimeClient-${uuidv4()}`
        });
    }
}

const client = new Client();

export {client};