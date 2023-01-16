import { IAdapter } from "../..";
import { con, connect } from "./conection";

class MysqlAdapter implements IAdapter {
	constructor() {
		connect();
	}
	executeQuery(query: string): Promise<any> {
		return new Promise((resolve, reject) => {
			con.query(query, function (err, result) {
				if (err) reject("Error");
				resolve(result);
			});
		});
	}
}
const mysqlAdapter = new MysqlAdapter();
export default mysqlAdapter;
