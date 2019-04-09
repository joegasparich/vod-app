/** @jsx jsx */
import * as React from "react";
import { hot } from "react-hot-loader";
import { css, jsx } from "@emotion/core";
import { IMovieData, IMovie } from "../types/MovieData";
import Carousel from "./Carousel";
import MoviePlayer from "./MoviePlayer";

interface IProps {}
interface IState {
	data: IMovieData | undefined;
	openMovie: IMovie | undefined;
}

const Styles = css`
	width: 80%;
	margin: 2rem auto;
`;

class App extends React.Component<IProps, IState> {
	// Initial state
	public readonly state: IState = {
		data: undefined,
		openMovie: undefined,
	};

	// Lifecycle Methods
	public componentDidMount() {
		fetch("https://demo2697834.mockable.io/movies")
			.then((response: Response) => response.json())
			.then((data: IMovieData) => this.setState({ data }));
	}

	public render(): JSX.Element {
		return (
			<div className="app" css={Styles}>
				<h1>Video On-Demand</h1>
				{this.state.data ? (
					<Carousel movies={this.state.data.entries} handleOpenMovie={this.handleOpenMovie} />
				) : (
					<p>Loading...</p>
				)}
				{this.state.openMovie && (
					<MoviePlayer movie={this.state.openMovie} handleCloseMovie={this.handleCloseMovie} />
				)}
			</div>
		);
	}

	public handleOpenMovie = (movie: IMovie) => {
		this.setState({ openMovie: movie });
	};

	public handleCloseMovie = () => {
		this.setState({ openMovie: undefined });
	};
}

export default hot(module)(App);
