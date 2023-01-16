import { IBookRepository } from ".";
import { IAdapter } from "../../";
import { IBook, IPage } from "../entity";
import mysqlAdapter from "../../share/dbAdapters/adapters/mysql/mysql.adapter";

class BookRepository implements IBookRepository {
	Adapter: IAdapter;
	constructor(adapter: IAdapter) {
		this.Adapter = adapter;
	}
	getBook(bookId: number): Promise<IBook> {
		return new Promise((resolve, reject) => {
			this.Adapter.executeQuery(`SELECT * FROM book where id = ${bookId}`)
				.then(resolve)
				.catch(reject);
		});
	}
	getPage(bookId: number, pageNumber: number): Promise<IPage> {
		return new Promise((resolve, reject) => {
			this.Adapter.executeQuery(
				`SELECT * FROM page WHERE book_id = ${bookId} AND page_number = ${pageNumber}`,
			)
				.then(resolve)
				.catch(reject);
		});
	}
	getAllBooks(): Promise<IBook[]> {
		return new Promise((resolve, reject) => {
			this.Adapter.executeQuery("SELECT * FROM book")
				.then(resolve)
				.catch(reject);
		});
	}
}
const bookRepository = new BookRepository(mysqlAdapter);
export default bookRepository;
