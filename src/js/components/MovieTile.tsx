/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as React from "react";
import { IMovie, IImage } from "../types/MovieData";

/* Component Interface */
interface IProps {
	movie: IMovie;
	focused: boolean;
	handleSelect: (event: React.SyntheticEvent<HTMLDivElement, Event>) => void;
	handleOpenMovie: (movie: IMovie) => void;
}
interface IState {}

/* Component Styles */
const Styles = css`
	margin: 1rem;
	min-width: 214px;
	overflow: hidden;
	cursor: pointer;

	@media (max-width: 750px) {
		min-width: 0;
		width: 130px;

		img {
			width: 100%;
		}
	}

	transition: 0.2s transform ease;
	&:hover {
		transform: scale(1.05);
	}

	.title {
		text-align: center;
		white-space: nowrap;
		margin: 0;
	}

	&:focus {
		outline: 2px solid #5599ff;
	}
`;

class MovieTile extends React.Component<IProps, IState> {
	// Refs
	private ref: React.RefObject<HTMLDivElement> = React.createRef();

	// Lifecycle Methods
	public componentDidUpdate(prevProps: IProps) {
		if (this.props.focused && this.ref.current && !prevProps.focused) {
			this.ref.current.focus();
		}
	}

	public render(): JSX.Element {
		const image: IImage | undefined = this.props.movie.images.find((i: IImage) => i.type === "cover");

		return (
			<div
				id={this.props.movie.id}
				className="movie-tile"
				css={Styles}
				tabIndex={-1}
				ref={this.ref}
				onFocus={this.props.handleSelect}
				onClick={() => this.props.handleOpenMovie(this.props.movie)}
			>
				{image && <img src={image.url} alt={this.props.movie.title} />}
				<p className="title">{this.props.movie.title}</p>
			</div>
		);
	}
}

export default MovieTile;
