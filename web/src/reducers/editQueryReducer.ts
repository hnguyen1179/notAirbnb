import { IDate } from "../components/MobileNavbar/MobileSearchForm";

const initialEditMenu = {
	location: false,
	dates: false,
	guests: false,
	tags: false,
};

export const initialState = {
	location: "", // field
	dates: {
		// field
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	},
	guests: 0, // field
	edit: false,
	editMenu: initialEditMenu,
};

type EditMenuEnum = "location" | "dates" | "guests" | "tags";

export interface EditQueryState {
	location: string;
	dates: IDate;
	guests: number;
	edit: boolean;
	editMenu: { [key in EditMenuEnum]: boolean };
}

interface Action {
	type: string;
	field?: string;
	value?: string | number | IDate;
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
		case "openEdit": {
			return {
				...state,
				edit: true,
			};
		}
		case "closeEdit": {
			document.body.style.overflow = "unset";

			return {
				...state,
				editMenu: initialEditMenu,
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
			document.body.style.overflow = "unset";

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
