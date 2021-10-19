import { Cloudinary } from "@cloudinary/base";
import { FC, createContext, useContext, useState, useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

const width = window.innerWidth;

const AppStateProvider: FC = ({ children }) => {
	const mqlMobile = window.matchMedia("(min-width: 744px)");
	const mqlMap = window.matchMedia("(min-width: 1128px)");

	const { data } = useMeQuery({});
	const [user, setUser] = useState<any>(null);
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
		mqlMobile.addEventListener("change", handleMobileChange);
		mqlMap.addEventListener("change", handleMapChange);

		return () => {
			mqlMobile.removeEventListener("change", handleMobileChange);
			mqlMap.removeEventListener("change", handleMapChange);
		};
	}, []);

	useEffect(() => {
		setUser(data?.me);
	}, [data]);

	return (
		<AppContext.Provider
			value={{
				cloudinary,
				user: user,
				mobile,
				map,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

const initialState: any = {};

export interface UserPartial {
	id: string;
	firstName: string;
	lastName: string;
}

export interface IDates {
	checkIn: Date;
	checkOut: Date;
}

export type GlobalState = {
	cloudinary: Cloudinary;
	user: UserPartial | null;
	mobile: boolean;
	map: boolean;
};

const AppContext = createContext<GlobalState>(initialState);

const useAppState = () => {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error("useAppState must be used within AppStateProvider");
	}

	return context;
};

export { AppStateProvider, useAppState };
