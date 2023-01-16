import { IncomingHttpHeaders, IncomingMessage, ServerResponse } from "http";

export class Response {
	success(
		res: ServerResponse<IncomingMessage>,
		data: any,
		status: number,
		format: string,
	) {
		res.writeHead(status, this.getHeaderByFormat(format));
		res.write(this.getBodyFormat(data, format));
		res.end();
	}
	error(res: ServerResponse<IncomingMessage>, data: any, status: number) {
		res.writeHead(status, this.getHeaderByFormat());
		res.write(this.getBodyFormat(data, "error"));
		res.end();
	}
	getHeaderByFormat(format: string = "json") {
		const headers: IncomingHttpHeaders = {
			"Access-Control-Allow-Origin": "*",
		};

		if (!format || format === "json")
			headers["Content-Type"] = "application/json";
		if (format === "html") headers["Content-Type"] = "text/html";
		if (format === "txt" || format === "text")
			headers["Content-Type"] = "text/plain";
		return headers;
	}
	getBodyFormat(data: any, format: string) {
		if (!format) return JSON.stringify({ data });
		if (format === "error") return JSON.stringify({ error: data });
		if (format === "json") return JSON.stringify(data);
		if (format === "html") return this.getHtmlResponse(data);
		if (format === "txt" || format === "text") return data[0].text;
	}
	getHtmlResponse(data: any) {
		return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Response</title>
      </head>
      <body>${data[0].text}</body>
    </html>
    `;
	}
}
