import { Redirect, Route } from "react-router";
import useAuthToken from "../hooks/useAuthToken";

const NoAuthRedirectRoute = ({ component: Component, ...rest }: any) => {
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
