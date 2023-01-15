import { IncomingMessage } from "http";
interface IParams {
	[key: string]: string;
}
export class Params {
	static getParams(req: IncomingMessage, params: string[]): IParams {
		const url = req.url || "";
		const paramsResult: IParams = {};
		const formatUrl = new URL(url, `http://${req.headers.host}`);
		for (let i = 0; i < params.length; i++) {
			const param = formatUrl.searchParams.get(params[i]);
			if (param) paramsResult[params[i]] = param;
		}
		return paramsResult;
	}
	static getNotFoundParams(req: IncomingMessage, params: string[]): string[] {
		const url = req.url || "";
		const formatUrl = new URL(url, `http://${req.headers.host}`);
		const paramsNotFound: string[] = [];
		for (let i = 0; i < params.length; i++) {
			const param = formatUrl.searchParams.get(params[i]);
			if (!param) paramsNotFound.push(params[i]);
		}
		return paramsNotFound;
	}
	checkHasAllParams(req: IncomingMessage, params: string[]): boolean {
		const url = req.url || "";
		const formatUrl = new URL(url, `http://${req.headers.host}`);
		for (let i = 0; i < params.length; i++) {
			const param = formatUrl.searchParams.get(params[i]);
			if (!param) return false;
		}
		return true;
	}
}
