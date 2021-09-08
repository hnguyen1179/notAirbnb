import React, { useState, useEffect } from "react";
import { Cloudinary } from "@cloudinary/base";
import { AppContext } from "./AppContext";
import { useQuery } from "@apollo/client";
import { meQuery } from "../graphql/queries/me";
interface Props {
	children: React.ReactNode;
}

const width = window.innerWidth;

function AppState(props: Props) {
	const mql = window.matchMedia("(min-width: 744px)");
	// TODO: run me query on login and once fetched, set the state of the user 
	// to the user setState object
	const { data } = useQuery(meQuery);
	const [message, setMessage] = useState(
		"This is a message from the Provider"
	);
	const [locale, setLocale] = useState("en");
	const [mobile, setMobile] = useState(width <= 744);

	const cloudinary = new Cloudinary({
		cloud: {
			cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
		},
	});

	const handleMobileChange = () => {
		if (mql.matches) {
			setMobile(false);
		} else {
			setMobile(true);
		}
	};

	useEffect(() => {
		mql.addEventListener("change", handleMobileChange);

		return () => {
			mql.removeEventListener("change", handleMobileChange);
		};
	}, []);

	return (
		<AppContext.Provider
			value={{
				cloudinary,
				message,
				locale,
				user: data ? data.me : null,
				setMessage,
				setLocale,
				mobile,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
}

export default AppState;
