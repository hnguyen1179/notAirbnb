import { FC } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import useAuthToken from "../hooks/useAuthToken";

interface Props {
	component: (renderProps: RouteComponentProps) => JSX.Element;
	path: string;
}

// Prevent logged in users from accessing the 'Login Page'
const NoAuthRedirectRoute: FC<Props> = ({ component: Component, ...rest }) => {
	const [token] = useAuthToken();

	return (
		<Route
			{...rest}
			render={(props) => {
				if (token) {
					return <Redirect to="/" />;
				} else {
					return <Component {...props} />;
				}
			}}
		/>
	);
};

export default NoAuthRedirectRoute;
