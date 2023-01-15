import { IBook, IPage } from "../../entity";

export interface IBookRepository {
	getBook(bookId?: number): Promise<IBook>;
	getPage(bookId?: number, pageNumber?: number): Promise<IPage>;
	getAllBooks(): Promise<IBook[]>;
}
