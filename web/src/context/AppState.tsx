import React, { useState, useEffect } from "react";
import { Cloudinary } from "@cloudinary/base";
import { AppContext } from "./AppContext";
import { useMeQuery } from "../generated/graphql";
import { Loader } from "@googlemaps/js-api-loader";

interface Props {
	children: React.ReactNode;
}

const width = window.innerWidth;

function AppState(props: Props) {
	const mqlMobile = window.matchMedia("(min-width: 744px)");
	const mqlMap = window.matchMedia("(min-width: 1128px)");

	const { data } = useMeQuery();
	// LOGIN Bug, maybe look into how people store the current user object?
	const [mobile, setMobile] = useState(width <= 744);
	const [map, setMap] = useState(width >= 1128);

	const cloudinary = new Cloudinary({
		cloud: {
			cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
		},
	});

	const handleMobileChange = () => {
		if (mqlMobile.matches) {
			setMobile(false);
		} else {
			setMobile(true);
		}
	};

	const handleMapChange = () => {
		if (mqlMap.matches) {
			setMap(true);
		} else {
			setMap(false);
		}
	};

	useEffect(() => {
		(async () => {
			const loader = new Loader({
				apiKey: process.env.REACT_APP_GOOGLE_API_KEY as string,
				version: "weekly",
			});

			await loader.load();
		})();
		mqlMobile.addEventListener("change", handleMobileChange);
		mqlMap.addEventListener("change", handleMapChange);

		return () => {
			mqlMobile.removeEventListener("change", handleMobileChange);
			mqlMap.removeEventListener("change", handleMapChange);
		};
	}, []);

	return (
		<AppContext.Provider
			value={{
				cloudinary,
				user: data?.me ? data.me : null,
				mobile,
				map,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
}

export default AppState;
