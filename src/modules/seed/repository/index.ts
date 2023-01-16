import { IAdapter } from "../../";
import mysqlAdapter from "../../share/dbAdapters/adapters/mysql/mysql.adapter";
import { ISeedRepository } from "../interfaces";
import * as fs from "fs";
class SeedRepository implements ISeedRepository {
	constructor(private adapter: IAdapter) {}

	executeSeed(): Promise<void> {
		const adapter = this.adapter;
		return new Promise((resolve, reject) => {
			var queries = fs
				.readFileSync(__dirname + "/../query/index.sql")
				.toString()
				.replace(/(\r\n|\n|\r)/gm, " ")
				.replace(/\s+/g, " ")
				.split(";")
				.map(Function.prototype.call, String.prototype.trim)
				.filter(function (el) {
					return el.length != 0;
				});

			queries.forEach(function (query) {
				adapter.executeQuery(query).then(resolve).catch(reject);
			});
		});
	}
}
const seedRepository = new SeedRepository(mysqlAdapter);
export default seedRepository;
