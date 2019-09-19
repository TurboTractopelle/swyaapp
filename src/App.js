import React from "react";
import "./App.scss";
import B from "./components/B/B";
import Form from "./containers/Form";
import Auth from "./containers/Auth/Auth";
import { Route, Switch, NavLink } from "react-router-dom";

function App() {
	return (
		<div className="App" data-test="App">
			<nav>
				<NavLink to="/" exact>
					Login/register
				</NavLink>
				<NavLink to="/account" exact>
					My account
				</NavLink>
				<NavLink to="/b" exact>
					Dossier
				</NavLink>
				<button>logout</button>
			</nav>
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

export default App;
