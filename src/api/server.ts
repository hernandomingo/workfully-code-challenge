import express, { Router } from "express";
import { Server as HTTPServer } from "http";

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;
  private httpServer: HTTPServer | undefined;

  constructor(options: Options) {
    const { port, routes } = options;

    this.port = port;
    this.routes = routes;
  }

  start() {
    // Middlewares
    this.app.use(express.json());

    // Routes
    this.app.use(this.routes);

    // Open port
    this.httpServer = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  stop(): void {
    this.httpServer?.close();
  }
}
