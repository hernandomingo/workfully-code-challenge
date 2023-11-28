import * as Process from "process";
import { AppRoutes } from "../presentation/routes";
import { Server } from "../presentation/server";
import Config from "../config/startup";

Config.startup();

const port = Number(Process.env.PORT) || 3300;

const app = new Server({
  port,
  routes: AppRoutes.routes,
});
app.start();

export default app;