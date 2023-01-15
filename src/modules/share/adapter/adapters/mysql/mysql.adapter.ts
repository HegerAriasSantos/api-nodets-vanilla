import { IAdapter } from "../..";
import { con, connect } from "./conection";

export class MysqlAdapter implements IAdapter {
	constructor() {
		connect();
	}
	executeQuery(query: string): Promise<any> {
		return new Promise((resolve, reject) => {
			con.query(query, function (err, result) {
				if (err) reject("Error");
				if (result.length === 0) reject("Not Found");
				resolve(result);
			});
		});
	}
}
