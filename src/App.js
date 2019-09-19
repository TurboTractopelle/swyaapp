import React, { Component } from "react";
import "./App.scss";
import B from "./components/B/B";
import Form from "./containers/Form";
import Auth from "./containers/Auth/Auth";
import { Route, Switch, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/auth";

class App extends Component {
	componentDidMount() {
		this.props.authCheckState();
	}

	render() {
		let routes;

		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<NavLink to="/account" exact>
						My account
					</NavLink>
					<NavLink to="/b" exact>
						Dossier
					</NavLink>
					<button>logout</button>
				</Switch>
			);
		} else {
			routes = (
				<Switch>
					<NavLink to="/" exact>
						Login/register
					</NavLink>
				</Switch>
			);
		}

		return (
			<div className="App" data-test="App">
				<nav>{routes}</nav>
				<main>
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
		isAuthenticated: state.auth.token !== null
	};
};

const dispatchToProps = dispatch => {
	return {
		authCheckState: () => dispatch(actions.authCheckState())
	};
};

export default connect(
	mapStateToProps,
	dispatchToProps
)(App);
