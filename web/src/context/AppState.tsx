import React, { useState } from "react";
import { AppContext } from "./AppContext";
import { useQuery } from "@apollo/client";
import { meQuery } from "../graphql/queries/me";
interface Props {
	children: React.ReactNode;
}

function AppState(props: Props) {
	const { loading, error, data } = useQuery(meQuery);
	const [message, setMessage] = useState(
		"This is a message from the Provider"
	);
	const [locale, setLocale] = useState("en");

	return (
		<AppContext.Provider
			value={{
				message,
				locale,
				user: data ? data.me : null,
				setMessage,
				setLocale,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
}

export default AppState;
