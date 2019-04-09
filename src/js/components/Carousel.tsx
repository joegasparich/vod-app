/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { IMovie } from "../types/MovieData";
import MovieTile from "./MovieTile";

enum ScrollPos {
	Left,
	Middle,
	Right,
}

/* Component Interface */
interface IProps {
	movies: IMovie[];
	handleOpenMovie: (movie: IMovie) => void;
}
interface IState {
	index: number;
	scrollPos: ScrollPos;
}

/* Component Styles */
const Styles = css`
	position: relative;

	.contents {
		display: flex;
		flex-flow: row nowrap;
		overflow-x: scroll;
		@media (max-width: 750px) {
			flex-flow: row wrap;
			overflow-x: auto;
			justify-content: center;
		}
	}
	.scroll-button {
		position: absolute;
		height: 100%;
		width: 5%;
		top: 0;
		z-index: 1;

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

		@media (max-width: 750px) {
			display: none;
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

	/* Lifecycle Methods */
	public render(): JSX.Element {
		// Generate movie list HTML
		const movieList = this.props.movies.map((movie: IMovie, index: number) => (
			<MovieTile
				key={movie.id}
				movie={movie}
				focused={this.state.index === index}
				handleSelect={this.handleSelect}
				handleOpenMovie={this.props.handleOpenMovie}
			/>
		));

		// Is carousel wide enough to have scroll buttons
		const scrollX: boolean =
			!!this.contentRef.current && this.contentRef.current.scrollWidth > this.contentRef.current.clientWidth;

		return (
			<div className="carousel" css={Styles} tabIndex={0} onKeyDown={this.handleKeyDown}>
				{scrollX && this.state.scrollPos !== ScrollPos.Left && (
					<div className="scroll-button left" onMouseUp={this.handleScrollLeft}>
						<p>
							<MdChevronLeft />
						</p>
					</div>
				)}
				<div className="contents" ref={this.contentRef} onScroll={this.handleScroll}>
					{movieList}
				</div>
				{scrollX && this.state.scrollPos !== ScrollPos.Right && (
					<div className="scroll-button right" onMouseUp={this.handleScrollRight}>
						<p>
							<MdChevronRight />
						</p>
					</div>
				)}
			</div>
		);
	}

	// Arrow keys & Enter to select movie
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
			case "Enter":
				event.preventDefault();
				this.props.handleOpenMovie(this.props.movies[this.state.index]);
				break;
			default:
				break;
		}
	};

	// Set selected index on being selected
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

	// Get scroll state when scrolling elements
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

	// Scroll buttons
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
