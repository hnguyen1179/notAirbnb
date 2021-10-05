import { Cloudinary } from "@cloudinary/base";
import React from "react";

const initialState: any = {};

interface UserPartial {
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
	dates: IDates;
	setDates: (dates: IDates) => void;
};

export const AppContext = React.createContext<GlobalState>(initialState);
