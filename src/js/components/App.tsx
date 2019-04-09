/** @jsx jsx */
import * as React from "react";
import { hot } from "react-hot-loader";
import { css, jsx } from "@emotion/core";
import Cookie from "js-cookie";
import { MdRefresh } from "react-icons/md";

import { IMovieData, IMovie } from "../types/MovieData";
import Carousel from "./Carousel";
import MoviePlayer from "./MoviePlayer";
import { IWatchedData, IWatchedMovie } from "../types/WatchedData";

/* Component Interface */
interface IProps {}
interface IState {
	movieData: IMovieData | undefined;
	watchedData: IWatchedData | undefined;
	openMovie: IMovie | undefined;
}

/* Component Styles */
const Styles = css`
	width: 80%;
	margin: 2rem auto;
	position: relative;

	.carousel {
		margin: 2rem 0;
	}

	.refresh {
		height: 32px;
		width: 32px;
		cursor: pointer;
		position: absolute;
		top: 0;
		right: 0;
	}

	.loading {
		height: 20px;
		width: 20px;
		vertical-align: top;
	}
`;

class App extends React.Component<IProps, IState> {
	// Initial state
	public readonly state: IState = {
		movieData: undefined,
		watchedData: undefined,
		openMovie: undefined,
	};

	/* Lifecycle Methods */
	public componentDidMount() {
		// Fetch data on first load
		this.fetchMovieData();
		this.fetchWatchedData();
	}

	public render(): JSX.Element {
		// Get list of watched movies
		const watchedMovies: IMovie[] = [];
		if (this.state.movieData && this.state.watchedData) {
			const data: IMovieData = this.state.movieData; // Workaround because Typescript can't undefined check here
			this.state.watchedData.watchedMovies.forEach((w: IWatchedMovie) => {
				const movie = data.entries.find((m: IMovie) => m.id === w.movieID);
				if (movie) watchedMovies.push(movie);
			});
		}

		return (
			<div className="app" css={Styles} onKeyDown={this.handleKeyDown}>
				<h1>Video On-Demand</h1>
				<MdRefresh className="refresh" onClick={this.handleRefresh} />

				{this.state.movieData ? (
					<Carousel movies={this.state.movieData.entries} handleOpenMovie={this.handleOpenMovie} />
				) : (
					<p>
						Loading...
						<MdRefresh className="loading spin" />
					</p>
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

	/* Movie is opened */
	private handleOpenMovie = (movie: IMovie) => {
		// Get/Create watched movie data
		let watchedData: IWatchedData | undefined;
		watchedData = {
			watchedMovies: this.state.watchedData ? this.state.watchedData.watchedMovies : [],
		};
		// Check if movie already exists in watched movies
		const searchMovie = watchedData.watchedMovies.find((m: IWatchedMovie) => m.movieID === movie.id);
		if (searchMovie) {
			searchMovie.time = new Date();
		} else {
			watchedData.watchedMovies.push({ movieID: movie.id, time: new Date() });
		}
		// Sort by date watched
		watchedData.watchedMovies.sort((a: IWatchedMovie, b: IWatchedMovie) => b.time.getTime() - a.time.getTime());

		// Update state
		this.setState({
			openMovie: movie,
			watchedData,
		});

		// Set browser cookie
		Cookie.set("watched", JSON.stringify(watchedData));
	};

	/* Movie is closed */
	private handleCloseMovie = () => {
		this.setState({ openMovie: undefined });
	};

	/* Refresh data from sources */
	private handleRefresh = () => {
		this.setState({
			movieData: undefined,
		});
		this.fetchMovieData();
		this.fetchWatchedData();
	};

	/* Escape to close movie */
	private handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Escape") {
			this.handleCloseMovie();
		}
	};

	/* Get movies from API */
	private fetchMovieData = () => {
		fetch("https://demo2697834.mockable.io/movies")
			.then((response: Response) => response.json())
			.then((data: IMovieData) => this.setState({ movieData: data }));
	};

	/* Get watched data from cookie */
	private fetchWatchedData = () => {
		const cookie = Cookie.get("watched");
		if (!cookie) return;

		// Try parse cookie
		try {
			const data = JSON.parse(cookie);
			// Parse date objects from strings
			data.watchedMovies = data.watchedMovies.map((movie: any) => {
				movie.time = new Date(movie.time);
				return movie;
			});

			this.setState({
				watchedData: data,
			});
		} catch (error) {
			// Do nothing
		}
	};
}

export default hot(module)(App);
