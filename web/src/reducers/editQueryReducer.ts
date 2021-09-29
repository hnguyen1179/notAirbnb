import { IDate } from "../components/MobileNavbar/MobileSearchForm";

const initialEditMenu = {
	location: false,
	dates: false,
	guests: false,
	filters: false,
};

export type EditMenuEnum = "location" | "dates" | "guests" | "filters";

export interface EditQueryState {
	location: string;
	dates: IDate;
	guests: number;
	tags: string[];
	listingType: string[];
	languages: string[];
	smoking: boolean;
	pets: boolean;
	superhost: boolean;
	entire: boolean;
	edit: boolean;
	editMenu: { [key in EditMenuEnum]: boolean };
}

interface Action {
	type: string;
	field?: string;
	value?: string | number | IDate;
	object?: { [key: string]: boolean | string[] };
}

export const editQueryReducer = (
	state: EditQueryState,
	action: Action
): EditQueryState => {
	switch (action.type) {
		case "field": {
			return {
				...state,
				[action.field as string]: action.value,
			};
		}
		case "editFilters": {
			return {
				...state,
				...action.object,
			};
		}
		case "openEdit": {
			return {
				...state,
				edit: true,
			};
		}
		case "closeEdit": {
			return {
				...state,
				edit: false,
			};
		}
		case "openEditMenu": {
			document.body.style.overflow = "hidden";

			const newEditMenu = {
				...initialEditMenu,
			};

			newEditMenu[action.value as EditMenuEnum] = true;

			return {
				...state,
				editMenu: newEditMenu,
			};
		}
		case "closeEditMenu": {
			return {
				...state,
				editMenu: initialEditMenu,
			};
		}
		default:
			break;
	}

	return state;
};
