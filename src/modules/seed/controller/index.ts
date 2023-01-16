import { IncomingMessage, ServerResponse } from "http";
import seedRepository from "../repository";
import { ISeedRepository } from "../interfaces";
import { IRouter, Response } from "../../share";

class SeedController implements IRouter {
	constructor(private seedRepository: ISeedRepository) {}
	manageRoutes(
		req: IncomingMessage,
		res: ServerResponse<IncomingMessage>,
	): void {
		const response = new Response();
		if (req.url && req.url[req.url.length - 1] === "/")
			req.url = req.url.slice(0, -1);

		switch (req.url) {
			case "/seed":
				this.executeSeed(response, res);
				break;
			default:
				response.error(res, "Endpoint not Found", 404);
				break;
		}
	}

	//#region Getters
	executeSeed(Response: Response, res: ServerResponse<IncomingMessage>): void {
		this.seedRepository
			.executeSeed()
			.then(() => {
				Response.success(res, "executed succesful", 200, "json");
			})
			.catch(err => {
				Response.error(res, "Internal error", 500);
			});
	}

	//#endregion
}

const seedController = new SeedController(seedRepository);
export { seedController };
