import { createConnection } from "mysql";

export const con = createConnection({
	host: "localhost",
	user: "root",
	password: "",
});

export function connect() {
	con.connect(function (err) {
		if (err) throw err;
	});
}
