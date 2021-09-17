import React, { useState, useEffect } from "react";
import { Cloudinary } from "@cloudinary/base";
import { AppContext } from "./AppContext";
import { useMeQuery } from "../generated/graphql";
interface Props {
	children: React.ReactNode;
}

const width = window.innerWidth;

function AppState(props: Props) {
	const mql = window.matchMedia("(min-width: 744px)");
	const { data } = useMeQuery();

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
				user: data?.me ? data.me : null,
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
