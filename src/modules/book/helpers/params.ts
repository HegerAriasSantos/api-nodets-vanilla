import { IncomingMessage, ServerResponse } from "http";
import { Response } from "../../share";
import { IBookParams } from "../interfaces/params.interface";
export class BookParams {
	getParams(
		req: IncomingMessage,
		res: ServerResponse<IncomingMessage>,
	): IBookParams {
		const response = new Response();
		const url = req.url || "";
		const urlSplitted = url.split("/");
		const params: IBookParams = {};
		if (urlSplitted.length <= 2) return params;
		const bookId = Number(urlSplitted[2]);
		if (Number.isNaN(bookId))
			response.error(res, "bookId number is not a number", 400);
		params.bookId = bookId;
		if (urlSplitted.length <= 4) return params;
		const pageId = Number(urlSplitted[4]);
		if (Number.isNaN(pageId))
			response.error(res, "pageId number is not a number", 400);
		params.pageId = pageId;
		params.format = urlSplitted[5] ?? "json";
		return params;
	}
}
