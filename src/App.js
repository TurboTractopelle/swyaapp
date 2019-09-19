import React from "react";
import "./App.scss";
import A from "./components/A/A";
import B from "./components/B/B";
import { Route, Switch, NavLink } from "react-router-dom";

function App() {
	return (
		<div className="App" data-test="App">
			<nav>
				<NavLink to="/a">A</NavLink>
				<NavLink to="/b">B</NavLink>
			</nav>
			<Switch>
				<Route path="/a" component={A} />
				<Route path="/b" component={B} />
			</Switch>
		</div>
	);
}

export default App;
