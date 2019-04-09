export interface IWatchedMovie {
	movieID: string;
	time: Date;
}

export interface IWatchedData {
	watchedMovies: IWatchedMovie[];
}
