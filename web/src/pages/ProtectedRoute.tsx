import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../context/AppContext";

interface Props {
	component: React.Component;
}

const ProtectedRoute = ({
	component: Component,
	auth = false,
	to,
	...rest
}: any) => {
  const { user } = useContext(AppContext);

	return (
		<Route
			{...rest}
			render={(props) => {
				if () {
				}
			}}
		/>
	);
};

export default ProtectedRoute;
