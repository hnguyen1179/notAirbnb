import React, { useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AppStateProvider } from "./context/AppState";

import useAuthToken from "./hooks/useAuthToken";

import {
	LISTINGS,
	LISTING,
	LANDING,
	ENTRY,
	SEARCH,
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
import SearchPage from "./pages/SearchPage";
import ListingPage from "./pages/ListingPage";

const httpLink = createHttpLink({
	uri: process.env.REACT_APP_SERVER_URL,
});

function App() {
	console.log("RERENDERED")
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
							// me: {
							// 	keyArgs: false,
							// 	merge(existing = {}, incoming) {
							// 		console.log(
							// 			"ME QUERY EXISTING: ",
							// 			existing
							// 		);
							// 		console.log(
							// 			"ME QUERY INCOMING: ",
							// 			incoming
							// 		);

							// 		return incoming;
							// 	},
							// },
							reviewsByUserId: {
								keyArgs: false,
								merge(existing = [], incoming) {
									return [...existing, ...incoming];
								},
							},
							reviewsByHostId: {
								keyArgs: false,
								merge(existing = [], incoming) {
									return [...existing, ...incoming];
								},
							},
							basicSearch: {
								read(existing) {
									if (!existing) return undefined;
									// {args} wasn't returning correct offset field, and so just
									// returned the correct offset within query results
									return {
										count: existing.count,
										listings: existing.listings.slice(
											existing.offset,
											existing.offset + 10
										),
										offset: existing.offset,
									};
								},
								keyArgs: [
									"region",
									"checkIn",
									"checkOut",
									"guests",
									"tags",
									"listingType",
									"languages",
									"pets",
									"smoking",
									"superhost",
									"entire",
									"privateListing",
								],
								merge(
									existing = { count: 0, listings: [] },
									incoming,
									{ args }
								) {
									const offset = args?.offset || 0;
									const mergedListings = existing
										? existing.listings.slice(0)
										: [];

									for (
										let i = 0;
										i < incoming.listings.length;
										++i
									) {
										mergedListings[offset + i] =
											incoming.listings[i];
									}
									return {
										count: incoming.count,
										listings: mergedListings,
										offset: incoming.offset,
									};
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
			<AppStateProvider>
				<ModalProvider>
					<Router>
						<ScrollToTop />
						<Switch>
							<Route
								exact
								path={LANDING}
								component={LandingPage}
							/>

							<Route path={SEARCH} component={SearchPage} />
							<Route exact path={ERROR} component={ErrorPage} />
							<Route path={LISTINGS} component={Listings} />

							<Route
								path={LISTING}
								render={(routeProps) => (
									<ListingPage
										id={routeProps.match.params.id}
										history={routeProps.history}
										location={routeProps.location}
										match={routeProps.match}
									/>
								)}
							/>

							<Route
								path={USER_TRIPS}
								render={(routeProps) => (
									<TripsPage
										id={routeProps.match.params.id}
									/>
								)}
							/>

							<Route
								path={USER_TRIP}
								render={(routeProps) => (
									<TripPage
										id={routeProps.match.params.id}
										routeProps={routeProps}
									/>
								)}
							/>

							<Route
								path={HOST_PROFILE}
								render={(routeProps) => (
									<HostPage
										id={routeProps.match.params.id}
										routeProps={routeProps}
									/>
								)}
							/>

							<Route
								path={USER_PROFILE}
								render={(routeProps) => (
									<UserPage
										id={routeProps.match.params.id}
										routeProps={routeProps}
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
				</ModalProvider>
			</AppStateProvider>
		</ApolloProvider>
	);
}

export default App;
