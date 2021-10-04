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
	user: UserPartial | null;
	mobile: boolean;
	map: boolean;
};

export const AppContext = React.createContext<GlobalState>(initialState);
