export interface IAdapter {
	executeQuery(query: string): Promise<any>;
}
