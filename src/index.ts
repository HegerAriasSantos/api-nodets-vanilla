import Server from "./server";
import MainRouter from "./router/main.router";

new Server().start(new MainRouter());
