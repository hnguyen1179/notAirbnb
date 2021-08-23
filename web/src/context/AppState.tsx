import React, { useState } from "react";
import AppContext from "./app-context";
import useAuthToken from "../hooks/useAuthToken";
import { gql, useQuery } from "@apollo/client";

interface Props {
	children: React.ReactNode;
}

const ME = gql`
	query ME {
		me {
			firstName
			lastName
		}
	}
`;

function AppState(props: Props) {
	const { loading, error, data } = useQuery(ME);
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
