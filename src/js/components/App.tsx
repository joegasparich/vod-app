/** @jsx jsx */
import * as React from "react";
import { hot } from "react-hot-loader";
import { css, jsx } from "@emotion/core";
import Cookie from "js-cookie";

import { IMovieData, IMovie } from "../types/MovieData";
import Carousel from "./Carousel";
import MoviePlayer from "./MoviePlayer";
import { IWatchedData, IWatchedMovie } from "../types/WatchedData";

interface IProps {}
interface IState {
	movieData: IMovieData | undefined;
	watchedData: IWatchedData | undefined;
	openMovie: IMovie | undefined;
}

const Styles = css`
	width: 80%;
	margin: 2rem auto;

	.carousel {
		margin: 2rem 0;
	}
`;

class App extends React.Component<IProps, IState> {
	// Initial state
	public readonly state: IState = {
		movieData: undefined,
		watchedData: undefined,
		openMovie: undefined,
	};

	// Lifecycle Methods
	public componentDidMount() {
		this.fetchMovieData();
		this.fetchWatchedData();
	}

	public render(): JSX.Element {
		let watchedMovies: IMovie[] = [];
		if (this.state.movieData && this.state.watchedData) {
			const data: IWatchedData = this.state.watchedData; // Workaround because Typescript can't undefined check here
			watchedMovies = this.state.movieData.entries.filter((m: IMovie) => {
				return data.watchedMovies.find((w: IWatchedMovie) => m.id === w.movieID);
			});
		}

		return (
			<div className="app" css={Styles}>
				<h1>Video On-Demand</h1>

				{this.state.movieData ? (
					<Carousel movies={this.state.movieData.entries} handleOpenMovie={this.handleOpenMovie} />
				) : (
					<p>Loading...</p>
				)}

				<h5>Recently Watched</h5>

				{watchedMovies.length ? (
					<Carousel movies={watchedMovies} handleOpenMovie={this.handleOpenMovie} />
				) : (
					<p>No Recent Movies</p>
				)}

				{this.state.openMovie && (
					<MoviePlayer movie={this.state.openMovie} handleCloseMovie={this.handleCloseMovie} />
				)}
			</div>
		);
	}

	private handleOpenMovie = (movie: IMovie) => {
		let watchedData: IWatchedData | undefined;
		watchedData = {
			watchedMovies: this.state.watchedData ? this.state.watchedData.watchedMovies : [],
		};
		watchedData.watchedMovies.push({ movieID: movie.id, time: new Date() });
		watchedData.watchedMovies.sort((a, b) => a.time - b.time);

		this.setState({
			openMovie: movie,
			watchedData,
		});

		Cookie.set("watched", JSON.stringify(watchedData));
	};

	private handleCloseMovie = () => {
		this.setState({ openMovie: undefined });
		this.fetchWatchedData();
	};

	private fetchMovieData = () => {
		fetch("https://demo2697834.mockable.io/movies")
			.then((response: Response) => response.json())
			.then((data: IMovieData) => this.setState({ movieData: data }));
	};

	private fetchWatchedData = () => {
		const cookie = Cookie.get("watched");
		if (!cookie) return;

		// Try get cookie
		try {
			const data: IWatchedData = JSON.parse(cookie) as IWatchedData;

			this.setState({
				watchedData: data,
			});
		} catch (error) {
			console.error(error);
		}
	};
}

export default hot(module)(App);
