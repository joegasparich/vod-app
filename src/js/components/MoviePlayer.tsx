/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as React from "react";
import { MdClose } from "react-icons/md";

import { IMovie } from "../types/MovieData";

interface IProps {
	movie: IMovie;
	handleCloseMovie: () => void;
}
interface IState {}

const Styles = css`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.8);
	z-index: 2;

	display: flex;
	align-content: center;
	justify-content: center;

	.video-container {
		position: relative;
		width: 80%;
		margin: auto;

		.close-button {
			position: absolute;
			right: 0;
			top: 0;
			width: 3rem;
			height: 3rem;
			margin: 1rem;
			color: white;
			cursor: pointer;
			z-index: 5;
		}

		video {
			width: 100%;
		}
	}
`;

class MoviePlayer extends React.Component<IProps, IState> {
	public readonly state: IState = {};

	// Refs
	private mainRef: React.RefObject<HTMLDivElement> = React.createRef();
	private playerRef: React.RefObject<HTMLVideoElement> = React.createRef();

	// Lifecycle Methods
	public componentDidUpdate(prevProps: IProps) {
		if (this.props.movie.id !== prevProps.movie.id) {
			if (!this.playerRef.current) return;
			this.playerRef.current.currentTime = 0;
		}
	}

	public render(): JSX.Element {
		const url = this.props.movie.contents[0].url;
		if (!url) return <div />;

		return (
			<div className="video-player" css={Styles} ref={this.mainRef} onClick={this.handleClickOutsideVideo}>
				<div className="video-container">
					<MdClose className="close-button" onClick={this.props.handleCloseMovie} />
					<video autoPlay controls src={url} ref={this.playerRef} />
				</div>
			</div>
		);
	}

	private handleClickOutsideVideo = (event: React.MouseEvent) => {
		if (event.target === this.mainRef.current) {
			this.props.handleCloseMovie();
		}
	};
}

export default MoviePlayer;
