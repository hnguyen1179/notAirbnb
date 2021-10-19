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
					<ScrollToTop />
					<Switch>
						<Route exact path={LANDING} component={LandingPage} />

						<Route
							path={USER_TRIPS}
							render={(routeProps) => <TripsPage />}
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
								<URLParamsProvider>
									<SearchPage history={routeProps.history} />
								</URLParamsProvider>
							)}
						/>

						<Route
							path={LISTING}
							render={(routeProps) => (
								<URLParamsProvider>
									<ListingPage
										id={routeProps.match.params.id}
										history={routeProps.history}
										location={routeProps.location}
										match={routeProps.match}
									/>
								</URLParamsProvider>
							)}
						/>

						<Route path="*" component={ErrorPage} />
					</Switch>
				</Router>
			</ModalProvider>
		</AppStateProvider>
	);
}

export default App;
