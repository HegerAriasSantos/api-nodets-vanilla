import { IncomingMessage, ServerResponse } from "http";
import { IRouter, Response } from "../modules/share";
import routes from "./routes";

export default class MainRouter implements IRouter {
	manageRoutes(
		req: IncomingMessage,
		res: ServerResponse<IncomingMessage>,
	): void {
		const entity = req.url?.split("/")[1] || "";
		const resoponse = new Response();
		if (!entity || !routes.hasOwnProperty(entity))
			return resoponse.error(res, "Entity Not Found", 404);

		routes[entity].manageRoutes(req, res);
	}
}
