import { Cloudinary } from "@cloudinary/base";
import React from "react";

const initialState: any = {};

interface UserPartial {
	id: string;
	firstName: string;
	lastName: string;
}

export type GlobalState = {
	cloudinary: Cloudinary;
	message: string;
	locale: string;
	user: UserPartial | null;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
	setLocale: React.Dispatch<React.SetStateAction<string>>;
	mobile: boolean;
};

export const AppContext = React.createContext<GlobalState>(initialState);
