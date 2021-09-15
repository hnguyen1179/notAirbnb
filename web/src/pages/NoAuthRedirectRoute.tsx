import React from "react";
import { Redirect, Route } from "react-router";

const NoAuthRedirectRoute = ({ component: Component, token, ...rest }: any) => {
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
