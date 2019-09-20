import React, { Component } from "react";
import "./App.scss";
import B from "./components/B/B";
import Form from "./containers/Form";
import Auth from "./containers/Auth/Auth";
import { Route, Switch, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/auth";
import Spinner from "./components/UI/Spinner/Spinner";
import Message from "./components/UI/Message/Message";

export class App extends Component {
	componentDidMount() {
		this.props.authCheckState();
	}

	render() {
		let routes;

		const loading = this.props.loading && <Spinner />;

		const error = this.props.error && <Message cat="error">{this.props.error}</Message>;

		const connected = this.props.message && <Message cat="success">connected</Message>;

		console.log(this.props.message);

		if (this.props.isAuthenticated) {
			routes = (
				<nav>
					<NavLink to="/account" exact>
						My account
					</NavLink>
					<NavLink to="/b" exact>
						Dossier
					</NavLink>
					<button onClick={() => this.props.logout()}>logout</button>
				</nav>
			);
		} else {
			routes = (
				<nav>
					<NavLink to="/" exact>
						Login/register
					</NavLink>
				</nav>
			);
		}

		return (
			<div className="App" data-test="App">
				{routes}
				<main>
					{loading}
					{error}
					{connected}
					<Switch>
						<Route exact path="/" component={Auth} />
						<Route exact path="/account" component={Form} />
						<Route exact path="/dossier" component={B} />
					</Switch>
				</main>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
		loading: state.auth.loading,
		error: state.auth.error,
		message: state.auth.message
	};
};

const dispatchToProps = dispatch => {
	return {
		authCheckState: () => dispatch(actions.authCheckState()),
		logout: () => dispatch(actions.logout())
	};
};

export default connect(
	mapStateToProps,
	dispatchToProps
)(App);
