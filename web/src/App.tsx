import React, { useMemo } from "react";
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

import {
	LISTINGS,
	LISTING,
	LANDING,
	ENTRY,
	USER_PROFILE,
	USER_TRIPS,
	USER_TRIP,
	HOST_PROFILE,
	ERROR,
} from "./constants/routes";

import NoAuthRedirectRoute from "./pages/NoAuthRedirectRoute";
import LandingPage from "./pages/LandingPage";
import EntryPage from "./pages/EntryPage";
import UserPage from "./pages/UserPage";

import Listings from "./components/Listings";
import Listing from "./components/Listing";
import Users from "./components/Users";

import "./stylesheets/main.scss";
import { ModalProvider } from "./context/ModalContext";
import ScrollToTop from "./pages/ScrollToTop";
import TripsPage from "./pages/TripsPage";
import HostPage from "./pages/HostPage";
import TripPage from "./pages/TripPage";
import ErrorPage from "./pages/ErrorPage";

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
			cache: new InMemoryCache({
				typePolicies: {
					Query: {
						fields: {
							reviewsByUserId: {
								keyArgs: false,
								merge(existing = [], incoming) {
									return [...existing, ...incoming];
								},
							},
						},
					},
				},
			}),
		});
	}, [authLink]);

	return (
		<ApolloProvider client={client}>
			<ModalProvider>
				<AppState>
					<Router>
						<ScrollToTop />
						<Switch>
							<Route
								exact
								path={LANDING}
								component={LandingPage}
							/>

							<Route
								exact
								path={ERROR}
								component={ErrorPage}
							/>

							<Route path={LISTINGS} component={Listings} />

							<Route
								path={LISTING}
								render={(renderProps) => (
									<Listing id={renderProps.match.params.id} />
								)}
							/>

							<Route
								path={USER_TRIPS}
								render={(renderProps) => (
									<TripsPage
										id={renderProps.match.params.id}
										renderProps={renderProps}
									/>
								)}
							/>

							<Route
								path={USER_TRIP}
								render={(renderProps) => (
									<TripPage
										id={renderProps.match.params.id}
										renderProps={renderProps}
									/>
								)}
							/>

							<Route
								path={HOST_PROFILE}
								render={(renderProps) => (
									<HostPage
										id={renderProps.match.params.id}
										renderProps={renderProps}
									/>
								)}
							/>

							<Route
								path={USER_PROFILE}
								render={(renderProps) => (
									<UserPage
										id={renderProps.match.params.id}
										renderProps={renderProps}
									/>
								)}
							/>

							<Route exact path="/users" component={Users} />

							<NoAuthRedirectRoute
								path={ENTRY}
								token={token}
								component={EntryPage}
							/>
						</Switch>
					</Router>
				</AppState>
			</ModalProvider>
		</ApolloProvider>
	);
}

export default App;
