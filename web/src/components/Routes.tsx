import { Route, Redirect } from "react-router-dom";

// Implementing protected routes and redirects
export function IsUserRedirect({ user, loggedInPath, children, ...rest }: any) {
	return (
		<Route
			{...rest}
			render={() => {
				if (!user) {
					return children;
				}

				if (user) {
					return (
						<Redirect
							to={{
								pathname: loggedInPath,
							}}
						/>
					);
				}

				return null;
			}}
		/>
	);
}

export function ProtectedRoute({ user, children, ...rest }: any) {
	return (
		<Route
			{...rest}
			render={({ location }) => {
				if (user) {
					return children;
				}

				if (!user) {
					return (
						<Redirect
							to={{
								pathname: "signin",
								state: { from: location },
							}}
						/>
					);
				}

				return null;
			}}
		/>
	);
}
