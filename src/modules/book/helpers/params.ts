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
		const urlSplited = url.split("/");
		const params: IBookParams = {};
		if (urlSplited.length <= 2) return params;
		const bookId = Number(urlSplited[2] ?? "NaN");
		if (Number.isNaN(bookId))
			response.error(res, "bookId number is not a number", 400);
		params.bookId = bookId;
		if (urlSplited.length <= 4) return params;
		const pageId = Number(urlSplited[4] ?? "NaN");
		if (Number.isNaN(pageId))
			response.error(res, "pageId number is not a number", 400);
		params.pageId = pageId;
		params.format = urlSplited[5] ?? "json";
		return params;
	}
}
