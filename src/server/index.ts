import { createServer, Server, Socket } from "net";
import { JSONActionParser } from "../parser/JSONParser";
import { ActionDispatcher } from "../dispatcher";

interface ScraperOptions {
  preConnect?: (socket: Socket) => void;
  postConnect?: (socket: Socket) => void;
  port: number;
}

export class ScraperServer {
  private server: Server;
  private parser = new JSONActionParser();
  private dispatcher = new ActionDispatcher();

  constructor(private options: ScraperOptions) {
    this.server = createServer((socket) => {
      this.handleConnectionCreated.call(this, socket);
    });
    this.server.listen(this.options.port);
    console.log(`listening on port ${this.options.port}...`);
  }

  private handleConnectionCreated(socket: Socket) {
    this.options.preConnect && this.options.preConnect.bind(this, socket);
    socket.on("data", (data) => this.handleData.call(this, data));
    socket.on("close", () => this.handleDisconnect.call(this));
    this.options.postConnect && this.options.postConnect.bind(this, socket);
  }

  private async handleData(data: Buffer) {
    try {
      const parsedAction = this.parser.parse(data);

      if (!parsedAction) {
        console.error(`failed to parse action`);
        return;
      }

      console.log(`server parsed action ${JSON.stringify(parsedAction)}}`);
      this.dispatcher.dispatch(parsedAction.id, parsedAction?.params);
    } catch (e) {
      console.error(`failed to process request - `, e);
      return;
    }
  }

  private handleDisconnect() {
    console.log("client disconnected");
  }
}
