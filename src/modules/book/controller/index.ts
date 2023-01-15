import { IncomingMessage, ServerResponse } from "http";
import { BookParams } from "../helpers/params";
import { IRouter, Response } from "../../share";
import { IBookRepository } from "../repository";
import bookRepository from "../repository/book.repository";

class BookController implements IRouter {
	bookRepository: IBookRepository;
	constructor(bookRepository: IBookRepository) {
		this.bookRepository = bookRepository;
	}
	//  complete url is /book/:bookId/page/:pageId/:format
	manageRoutes(
		req: IncomingMessage,
		res: ServerResponse<IncomingMessage>,
	): void {
		const bookParams = new BookParams();
		const { bookId, pageId, format } = bookParams.getParams(req, res);
		const response = new Response();
		if (req.url && req.url[req.url.length - 1] === "/")
			req.url = req.url.slice(0, -1);
		switch (req.method) {
			case "GET":
				switch (req.url) {
					case "/book":
						this.getAllBooks(response, res);
						break;
					case `/book/${bookId}`:
						this.getBook(response, res, bookId);
						break;
					case `/book/${bookId}/page/${pageId}/${format}`:
						this.getPage(response, res, bookId, pageId, format);
						break;
					default:
						console.log("default");
						response.error(res, "Endpoint not Found", 404);
						break;
				}
				break;
			default:
				response.error(res, "Method not allowed", 200);
				break;
		}
	}

	//#region Getters
	getBook(
		Response: Response,
		res: ServerResponse<IncomingMessage>,
		bookId?: number,
	): void {
		this.bookRepository
			.getBook(bookId)
			.then(books => {
				Response.success(res, books, 200, "json");
			})
			.catch(err => {
				Response.error(res, "Internal error", 500);
			});
	}
	getPage(
		Response: Response,
		res: ServerResponse<IncomingMessage>,
		bookId?: number,
		pageId?: number,
		format?: string,
	): void {
		this.bookRepository
			.getPage(bookId, pageId)
			.then(page => {
				Response.success(res, page, 200, format ?? "json");
			})
			.catch(err => {
				Response.error(res, "Internal Error", 500);
			});
	}
	getAllBooks(Response: Response, res: ServerResponse<IncomingMessage>): void {
		this.bookRepository
			.getAllBooks()
			.then(books => {
				Response.success(res, books, 200, "json");
			})
			.catch(err => {
				Response.error(res, err, 500);
			});
	}

	//#endregion
}

const bookController = new BookController(bookRepository);
export { bookController };
