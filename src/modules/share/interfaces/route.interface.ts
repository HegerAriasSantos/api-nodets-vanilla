import { IRouter } from "..";

export interface IRoute {
	[path: string]: IRouter;
}
