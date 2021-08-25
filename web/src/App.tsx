import React, { useMemo } from "react";
// import { ThemeProvider } from "@material-ui/styles";
// import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/core/styles";
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

	// const theme = useMemo(() => {
	// 	return responsiveFontSizes(
	// 		createTheme({
	// 			palette: {
	// 				primary: {
	// 					main: "#00a6de",
	// 				},
	// 			},
	// 			typography: {
	// 				fontFamily: "Circular",
	// 				fontWeightLight: 300,
	// 				fontWeightRegular: 500,
	// 				fontWeightMedium: 600,
	// 				fontWeightBold: 700,
	// 			},
	// 			props: {
	// 				MuiInput: {
	// 					disableUnderline: true,
	// 				},
	// 			},
	// 		})
	// 	);
	// }, []);

	const client = useMemo(() => {
		return new ApolloClient({
			link: authLink.concat(httpLink),
			cache: new InMemoryCache(),
		});
	}, [authLink]);

	return (
		<ApolloProvider client={client}>
			{/* <ThemeProvider theme={theme}> */}
			<StylesProvider injectFirst>
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
			</StylesProvider>
			{/* </ThemeProvider> */}
		</ApolloProvider>
	);
}

export default App;
