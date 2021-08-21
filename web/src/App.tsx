import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Listings from "./components/Listings";
import Listing from "./components/Listing";
import Landing from "./pages/Landing";
import { LISTINGS, LISTING, LANDING } from "./constants/routes";

import "./stylesheets/main.scss";
import Users from "./components/Users";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path={LANDING} component={Landing} />
				<Route path={LISTINGS} component={Listings} />
				<Route
					path={LISTING}
					render={(renderProps) => (
						<Listing id={renderProps.match.params.id} />
					)}
				/>
				<Route exact path="/users" component={Users} />
			</Switch>
		</Router>
	);
}

export default App;
