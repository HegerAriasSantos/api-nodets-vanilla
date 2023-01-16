export interface ISeedRepository {
	executeSeed(): Promise<void>;
}
