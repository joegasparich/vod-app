/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as React from "react";
import { IMovie } from "../types/MovieData";
import MovieTile from "./MovieTile";

interface IProps {
	movies: IMovie[];
}
interface IState {
	index: number;
}

const Styles = css`
	display: flex;
	flex-flow: row nowrap;
	overflow-x: scroll;
`;

class Carousel extends React.Component<IProps, IState> {
	// Initial state
	public readonly state: IState = {
		index: 0,
	};

	public render(): JSX.Element {
		const movieList = this.props.movies.map((movie: IMovie, index: number) => (
			<MovieTile
				key={movie.id}
				movie={movie}
				focused={this.state.index === index}
				handleSelect={this.handleSelect}
			/>
		));

		return (
			<div id="carousel" css={Styles} tabIndex={0} onKeyDown={this.handleKeyDown}>
				{movieList}
			</div>
		);
	}

	private handleKeyDown = (event: React.KeyboardEvent) => {
		switch (event.key) {
			case "ArrowRight":
				event.preventDefault();
				if (this.state.index < this.props.movies.length - 1) {
					this.setState({ index: this.state.index + 1 });
				}
				break;
			case "ArrowLeft":
				event.preventDefault();
				if (this.state.index > 0) {
					this.setState({ index: this.state.index - 1 });
				}
				break;
			default:
				break;
		}
	};

	private handleSelect = (event: React.SyntheticEvent<HTMLDivElement, Event>) => {
		this.props.movies.map((movie: IMovie, index: number) => {
			if (movie.id === event.currentTarget.id) {
				this.setState({
					index,
				});
				return;
			}
		});
	};
}

export default Carousel;
