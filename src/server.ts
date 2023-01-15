import http from "http";
import dotenv from "dotenv";
import { IRouter } from "./modules/share";
export default class Server {
	public port: number = Number(process.env.PORT) || 4300;

	setPort(port: number) {
		this.port = port;
	}
	constructor() {
		dotenv.config({ path: ".env" });
	}

	start(router: IRouter) {
		http.createServer(router.manageRoutes).listen(this.port);
	}
}
