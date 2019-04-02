/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as React from "react";
import { IMovie, IImage } from "../types/MovieData";

interface IProps {
	movie: IMovie;
}
interface IState {}

const Styles = css`
	margin: 1rem;

	.title {
		text-align: center;
	}
`;

class MovieTile extends React.Component<IProps, IState> {
	public render(): JSX.Element {
		const image: IImage | undefined = this.props.movie.images.find((i: IImage) => i.type === "cover");
		if (!image) {
			return (
				<div id="movie-tile" css={Styles}>
					<p>{this.props.movie.title}</p>
				</div>
			);
		}

		return (
			<div id="movie-tile" css={Styles}>
				<img src={image.url} alt={this.props.movie.title} />
				<p className="title">{this.props.movie.title}</p>
			</div>
		);
	}
}

export default MovieTile;
