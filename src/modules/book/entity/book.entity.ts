import { IPage } from "./";

export interface IBook {
	id: number;
	title: string;
	pagesNumber: number;
	author: string;
	pages: IPage[];
}
