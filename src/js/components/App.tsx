/** @jsx jsx */
import * as React from "react";
import { hot } from "react-hot-loader";
import { css, jsx } from "@emotion/core";
import { IMovieData } from "../types/MovieData";
import Carousel from "./Carousel";

interface IProps {}
interface IState {
	data: IMovieData | undefined;
}

const Styles = css`
	width: 80%;
	margin: 2rem auto;
`;

class App extends React.Component<IProps, IState> {
	// Initial state
	public readonly state: IState = {
		data: undefined,
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
				{this.state.data ? <Carousel movies={this.state.data.entries} /> : <p>Loading</p>}
			</div>
		);
	}
}

export default hot(module)(App);
