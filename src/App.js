import React from "react";
import "./App.scss";
import A from "./components/A/A";
import B from "./components/B/B";
import Form from "./containers/Form";
import { Route, Switch, NavLink } from "react-router-dom";

function App() {
	return (
		<div className="App" data-test="App">
			<nav>
				<NavLink to="/" exact>
					Form
				</NavLink>
				<NavLink to="/a" exact>
					A
				</NavLink>
				<NavLink to="/b" exact>
					B
				</NavLink>
			</nav>
			<main>
				<Switch>
					<Route exact path="/" component={Form} />
					<Route exact path="/a" component={A} />
					<Route exact path="/b" component={B} />
				</Switch>
			</main>
		</div>
	);
}

export default App;
