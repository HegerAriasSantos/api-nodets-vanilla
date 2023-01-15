import { IncomingMessage, ServerResponse } from "http";

export interface IRouter {
	manageRoutes(
		req: IncomingMessage,
		res: ServerResponse<IncomingMessage>,
	): void;
}
