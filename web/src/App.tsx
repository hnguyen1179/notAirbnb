import React, { useMemo } from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import AppState from "./context/AppState";

import useAuthToken from "./hooks/useAuthToken";

import { LISTINGS, LISTING, LANDING } from "./constants/routes";
import Landing from "./pages/Landing";

import Listings from "./components/Listings";
import Listing from "./components/Listing";
import Users from "./components/Users";
import Navbar from "./components/Navbar";

import "./stylesheets/main.scss";

const httpLink = createHttpLink({
	uri: process.env.REACT_APP_SERVER_URL,
});

function App() {
	const [token] = useAuthToken();

	const authLink = setContext((_, { headers }) => {
		// get auth token from cookies if it exists and sets it inside header of requests
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : "",
			},
		};
	});

	const client = useMemo(() => {
		return new ApolloClient({
			link: authLink.concat(httpLink),
			cache: new InMemoryCache(),
		})
	}, [authLink]);

	return (
		<ApolloProvider client={client}>
			<Router>
				<AppState>
					<Navbar />

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
				</AppState>
			</Router>
		</ApolloProvider>
	);
}

export default App;
