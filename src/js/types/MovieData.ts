export interface IMetadata {
	value: string;
	name: string;
}

export interface IContent {
	url: string;
	format: string;
	width: number;
	height: number;
	language: string;
	duration: number;
	geoLock: boolean;
	id: string;
}

export interface ICredit {
	role: string;
	name: string;
}

export interface IParentalRating {
	scheme: string;
	rating: string;
}

export interface IImage {
	type: string;
	url: string;
	width: number;
	height: number;
	id: string;
}

export interface ICategory {
	title: string;
	description: string;
	id: string;
}

export interface IEntry {
	title: string;
	description: string;
	type: string;
	publishedDate: any;
	availableDate: any;
	metadata: IMetadata[];
	contents: IContent[];
	credits: ICredit[];
	parentalRatings: IParentalRating[];
	images: IImage[];
	categories: ICategory[];
	id: string;
}

export interface IMovieData {
	totalCount: number;
	entries: IEntry[];
}
