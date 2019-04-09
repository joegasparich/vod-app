/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as React from "react";
import { IMovie } from "../types/MovieData";
import MovieTile from "./MovieTile";

enum ScrollPos {
	Left,
	Middle,
	Right,
}

interface IProps {
	movies: IMovie[];
	handleOpenMovie: (movie: IMovie) => void;
}
interface IState {
	index: number;
	scrollPos: ScrollPos;
}

const Styles = css`
	position: relative;

	.contents {
		display: flex;
		flex-flow: row nowrap;
		overflow-x: scroll;
	}
	.scroll-button {
		position: absolute;
		height: 100%;
		width: 5%;
		top: 0;
		z-index: 3;

		display: flex;
		justify-content: center;
		align-items: center;

		color: white;
		background-color: rgba(0, 0, 0, 0.5);
		font-size: 5rem;
		cursor: pointer;

		&.left {
			left: 0;
		}
		&.right {
			right: 0;
		}
	}
`;

class Carousel extends React.Component<IProps, IState> {
	// Initial state
	public readonly state: IState = {
		index: 0,
		scrollPos: ScrollPos.Left,
	};

	// Refs
	private contentRef: React.RefObject<HTMLDivElement> = React.createRef();

	public render(): JSX.Element {
		const movieList = this.props.movies.map((movie: IMovie, index: number) => (
			<MovieTile
				key={movie.id}
				movie={movie}
				focused={this.state.index === index}
				handleSelect={this.handleSelect}
				handleOpenMovie={this.props.handleOpenMovie}
			/>
		));

		return (
			<div className="carousel" css={Styles} tabIndex={0} onKeyDown={this.handleKeyDown}>
				{this.state.scrollPos !== ScrollPos.Left && (
					<div className="scroll-button left" onMouseUp={this.handleScrollLeft}>
						<p>{"<"}</p>
					</div>
				)}
				<div className="contents" ref={this.contentRef} onScroll={this.handleScroll}>
					{movieList}
				</div>
				{this.state.scrollPos !== ScrollPos.Right && (
					<div className="scroll-button right" onMouseUp={this.handleScrollRight}>
						<p>{">"}</p>
					</div>
				)}
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

	private handleScroll = (event: React.UIEvent) => {
		if (event.currentTarget.scrollLeft <= 0) {
			this.setState({ scrollPos: ScrollPos.Left });
		} else if (
			event.currentTarget.scrollLeft + event.currentTarget.clientWidth >=
			event.currentTarget.scrollWidth
		) {
			this.setState({ scrollPos: ScrollPos.Right });
		} else {
			if (this.state.scrollPos !== ScrollPos.Middle) {
				this.setState({ scrollPos: ScrollPos.Middle });
			}
		}
	};

	private handleScrollLeft = () => {
		if (!this.contentRef.current) return;

		this.contentRef.current.scrollBy({ top: 0, left: -500, behavior: "smooth" });
	};
	private handleScrollRight = () => {
		if (!this.contentRef.current) return;

		this.contentRef.current.scrollBy({ top: 0, left: 500, behavior: "smooth" });
	};
}

export default Carousel;
