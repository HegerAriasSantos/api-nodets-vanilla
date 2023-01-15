import { IncomingMessage, ServerResponse } from "http";
import { IRouter } from "../modules/share";
import routes from "./routes";

export default class MainRouter implements IRouter {
	manageRoutes(
		req: IncomingMessage,
		res: ServerResponse<IncomingMessage>,
	): void {
		const entity = req.url?.split("/")[1] || "";
		if (!entity || !routes.hasOwnProperty(entity)) {
			res.statusCode = 404;
			res.end();
			return;
		}
		routes[entity].manageRoutes(req, res);
	}
}
