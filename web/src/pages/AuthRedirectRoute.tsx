import React, {
	FC,
	ReactComponentElement,
	useEffect,
	useRef,
	useState,
} from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import Loading from "../components/Loading";
import { useAppState } from "../context/AppContext";
import { useVerifyTripAuthMutation } from "../generated/graphql";

interface ComponentProps {
	routeProps: RouteComponentProps<IDProp>;
	id: string;
}

interface InnerProps {
	component: any;
	routeProps: RouteComponentProps<IDProp>;
	path: string;
}

const AuthRedirectRouteInner: FC<InnerProps> = ({
	component: Component,
	routeProps,
	path,
}) => {
	console.log("INSIDE AUTH REDIRECT INNER ROUTE");
	const { user } = useAppState();
	const [verifyTripAuth] = useVerifyTripAuthMutation();
	const pathname = routeProps.location.pathname;
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		(async () => {
			if (user) {
				const reservationId = pathname.split("/")[2];

				const { data } = await verifyTripAuth({
					variables: {
						userId: user.id,
						reservationId,
					},
				});

				console.log("OUtPUT: ", data?.verifyTripAuth);
				setAuthorized(data?.verifyTripAuth as boolean);
			}
		})();
	}, [pathname, user, verifyTripAuth, authorized]);

	console.log("rendering again ");
	return authorized ? (
		<Component id={routeProps.match.params.id} routeProps={routeProps} />
	) : (
		<Redirect to="/404" />
	);
};

interface IDProp {
	id: string;
}

interface Props {
	component: any;
	path: string;
}

const AuthRedirectRoute: FC<Props> = (props) => {
	console.log(" in side auth redirect route ");

	return (
		<Route
			path={props.path}
			exact
			component={(renderProps: RouteComponentProps<IDProp>) => (
				<AuthRedirectRouteInner
					routeProps={renderProps}
					path={props.path}
					component={props.component}
				/>
			)}
		/>
	);
};

export default AuthRedirectRoute;
