/** @jsx jsx */
import * as React from "react";
import { hot } from "react-hot-loader";
import { css, jsx } from "@emotion/core";

interface IProps {}
interface IState {}

const Styles = css`
	width: 80%;
	margin: 2rem auto;
`;

class App extends React.Component<IProps, IState> {
	public render(): JSX.Element {
		return (
			<div className="app" css={Styles}>
				<h1>Video On-Demand</h1>
			</div>
		);
	}
}

export default hot(module)(App);
