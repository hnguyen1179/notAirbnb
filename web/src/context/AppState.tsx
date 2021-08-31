import React, { useState } from "react";
import { Cloudinary } from "@cloudinary/base";
import { AppContext } from "./AppContext";
import { useQuery } from "@apollo/client";
import { meQuery } from "../graphql/queries/me";
interface Props {
	children: React.ReactNode;
}

function AppState(props: Props) {
	const { data } = useQuery(meQuery);
	const [message, setMessage] = useState(
		"This is a message from the Provider"
	);
	const [locale, setLocale] = useState("en");

	const cloudinary = new Cloudinary({
		cloud: {
			cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
		},
	});

	return (
		<AppContext.Provider
			value={{
				cloudinary,
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
