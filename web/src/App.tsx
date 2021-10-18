import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppStateProvider } from "./context/AppContext";

import {
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

import "./stylesheets/main.scss";
import { ModalProvider } from "./context/ModalContext";
import ScrollToTop from "./pages/ScrollToTop";
import TripsPage from "./pages/TripsPage";
import HostPage from "./pages/HostPage";
import TripPage from "./pages/TripPage";
import ErrorPage from "./pages/ErrorPage";
import SearchPage from "./pages/SearchPage";
import ListingPage from "./pages/ListingPage";
import { URLParamsProvider } from "./context/URLParamsContext";

function App() {

	return (
		<AppStateProvider>
			<ModalProvider>
				<Router>
					<URLParamsProvider>
						<ScrollToTop />
						<Switch>
							<Route
								exact
								path={LANDING}
								component={LandingPage}
							/>
							<Route exact path={ERROR} component={ErrorPage} />
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

							<NoAuthRedirectRoute
								path={ENTRY}
								component={EntryPage}
							/>

							<Route
								path={SEARCH}
								render={(routeProps) => (
									<SearchPage history={routeProps.history} />
								)}
							/>
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
							<Route path="*" component={ErrorPage} />
						</Switch>
					</URLParamsProvider>
				</Router>
			</ModalProvider>
		</AppStateProvider>
	);
}

export default App;
