/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as React from "react";
import { IMovie } from "../types/MovieData";
import MovieTile from "./MovieTile";

interface IProps {
	movies: IMovie[];
}
interface IState {}

const Styles = css`
	display: flex;
	flex-flow: row nowrap;
	overflow-x: scroll;
`;

class Carousel extends React.Component<IProps, IState> {
	public render(): JSX.Element {
		const movieList = this.props.movies.map((movie: IMovie) => <MovieTile movie={movie} />);

		return (
			<div id="carousel" css={Styles}>
				{movieList}
			</div>
		);
	}
}

export default Carousel;
