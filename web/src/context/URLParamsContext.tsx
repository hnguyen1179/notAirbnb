import {
	createContext,
	useContext,
	useReducer,
	useState,
	useRef,
	useMemo,
} from "react";
import { History } from "history";
import {
	EditMenuEnum,
	editQueryReducer,
	EditQueryState,
} from "../reducers/editQueryReducer";
import { addDays, format } from "date-fns";
import { useHistory } from "react-router";
import {
	ArrayField,
	BooleanField,
} from "../components/SearchPageTopBar/FiltersEditMenu";
import { BasicSearchVariables } from "../pages/SearchPage";

interface IURLParamsProviderProps {
	variables: BasicSearchVariables;
	state: EditQueryState;
	history: History<any>;
	submitNewQuery: () => void;
	handleOpenEdit: () => void;
	handleCloseEdit: () => void;
	handleOpenEditMenu: (menu: EditMenuEnum) => void;
	handleCloseEditMenu: () => void;
	resetFilters: () => void;
	searchHandlers: {
		handleLocationChange: (value: string) => void;
		handleDateChange: (ranges: any) => void;
		handleGuestChange: (value: number) => void;
	};
	filterHandlers: {
		handleToggleBooleanField: (
			e: React.ChangeEvent<HTMLInputElement>
		) => void;
		handleToggleArrayField: (
			e: React.ChangeEvent<HTMLInputElement>,
			field: ArrayField
		) => void;
	};
	activeNumFilters: number;
}

export const URLParamsContext = createContext<
	IURLParamsProviderProps | undefined
>(undefined);

const filtersDefault = {
	entire: false,
	privateListing: false,
	private: false,
	superhost: false,
	tags: [],
	listingType: [],
	pets: false,
	smoking: false,
	languages: [],
};

const editMenuDefault = {
	location: false,
	dates: false,
	guests: false,
	filters: false,
};

const URLParamsProvider: React.FC = ({ children }) => {
	const history = useHistory();
	const currentSearchString = localStorage.getItem("params");
	const searchString = history.location.search
		? history.location.search
		: currentSearchString;

	const searchParams = useMemo(
		() => new URLSearchParams(searchString || ""),
		[searchString]
	);

	const variables: BasicSearchVariables = useMemo(
		() => ({
			region: searchParams.get("region") as string,
			guests: parseInt(searchParams.get("guests") as string),
			checkIn:
				(searchParams.get("check-in") as string) ||
				new Date().toString(),
			checkOut:
				(searchParams.get("check-out") as string) ||
				new Date().toString(),
			tags: (searchParams.get("tags") as string)?.split(";"),
			listingType: (searchParams.get("listingType") as string)?.split(
				";"
			),
			languages: (searchParams.get("languages") as string)?.split(";"),
			smoking: searchParams.get("smoking") === "true",
			pets: searchParams.get("pets") === "true",
			superhost: searchParams.get("superhost") === "true",
			entire: searchParams.get("entire") === "true",
			privateListing: searchParams.get("privateListing") === "true",
			offset: (parseInt(searchParams.get("page") as string) - 1) * 10,
		}),
		[searchParams]
	);

	// Checks to see if any filters are set
	const activeNumFilters = Array.from(
		searchParams.entries(),
		([key, _]) => key
	).filter((key) => {
		return [
			"tags",
			"listingType",
			"languages",
			"smoking",
			"pets",
			"superhost",
			"entire",
			"privateListing",
		].includes(key);
	}).length;

	const initialReducerState = {
		...variables,
		tags: variables.tags || [],
		listingType: variables.listingType || [],
		languages: variables.languages || [],
		smoking: variables.smoking,
		pets: variables.pets,
		superhost: variables.superhost,
		entire: variables.entire,
		privateListing: variables.privateListing,
		edit: false,
		editMenu: editMenuDefault,
		location: variables.region,
		dates: {
			startDate: new Date(variables.checkIn),
			endDate: new Date(variables.checkOut),
			key: "selection",
		},
	};

	{
		// PAGE REFRESH WILL WIPE OUT THE STATE OF REDUCER; and so you must
		// store the last value within the localStorage and then if it exists;
		// you must write it as initial state;
	}

	const [state, dispatch] = useReducer(editQueryReducer, initialReducerState);
	const [clear, setClear] = useState(false);
	const tempState = useRef<EditQueryState | null>(null);

	// Functions involve dispatch/changing reducer state

	// Submits a new search request with new URL Params
	const submitNewQuery = () => {
		const {
			dates,
			location,
			guests,
			entire,
			privateListing,
			superhost,
			pets,
			smoking,
			tags,
			listingType,
			languages,
		} = state;

		document.body.style.overflow = "unset";

		setClear(false);
		dispatch({ type: "closeEdit" });
		dispatch({ type: "closeEditMenu" });

		let checkOut = dates.endDate;
		if (dates.startDate.toString() === dates.endDate.toString()) {
			checkOut = addDays(dates.endDate, 1);
		}

		const nextSearch = new URLSearchParams(history.location.search);
		nextSearch.set("region", location?.split(", ")[0] || "Anywhere");
		nextSearch.set("check-in", format(dates.startDate, "M-d-yyy"));
		nextSearch.set("check-out", format(checkOut, "M-d-yyy"));
		nextSearch.set("guests", guests?.toString());
		nextSearch.set("page", "1");

		const arrayFields: { [key: string]: string[] } = {
			tags,
			listingType,
			languages,
		};

		const booleanFields: { [key: string]: boolean } = {
			entire,
			privateListing,
			superhost,
			pets,
			smoking,
		};

		Object.keys(booleanFields).forEach((key) => {
			if (booleanFields[key]) {
				nextSearch.set(key, "true");
			} else {
				nextSearch.delete(key);
			}
		});

		Object.keys(arrayFields).forEach((key) => {
			const array = arrayFields[key];

			if (array.length > 0) {
				nextSearch.set(key, array.join(";"));
			} else {
				nextSearch.delete(key);
			}
		});

		localStorage.setItem("params", nextSearch.toString());

		history.push({
			pathname: history.location.pathname,
			search: nextSearch.toString(),
		});
	};

	// Opens the edit dropdown
	const handleOpenEdit = () => {
		dispatch({ type: "openEdit" });
	};

	// Closes the edit dropdown
	const handleCloseEdit = () => {
		if (state.edit) {
			dispatch({ type: "closeEdit" });
		}
	};

	// Opens the edit menu; location, dates, guests, filters
	const handleOpenEditMenu = (field: EditMenuEnum) => {
		dispatch({ type: "openEditMenu", value: field });
	};

	// Closes the edit menu
	const handleCloseEditMenu = () => {
		document.body.style.overflow = "unset";

		if (clear) {
			dispatch({
				type: "editFilters",
				object: tempState.current as unknown as {
					[key: string]: boolean | string[];
				},
			});
		}

		dispatch({ type: "closeEditMenu" });
	};

	// Below are dispatch functions that change the state of the reducer state

	// Location Change
	const handleLocationChange = (value: string) => {
		dispatch({
			type: "field",
			field: "location",
			value,
		});
	};

	// Date Change
	const handleDateChange = (ranges: any) => {
		const start = ranges.selection.startDate as Date;
		const end = ranges.selection.endDate as Date;

		dispatch({
			type: "field",
			field: "dates",
			value: {
				startDate: start,
				endDate: end,
				key: "selection",
			},
		});
	};

	// Guests Change
	const handleGuestChange = (value: number) => {
		dispatch({
			type: "field",
			field: "guests",
			value,
		});
	};

	// for SectionEntire; toggles between both checkbox states
	const handleToggleBooleanField = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const field = e.currentTarget.value as BooleanField;

		const newFilters = {
			[field]: !state[field],
		};

		dispatch({ type: "editFilters", object: newFilters });
	};

	const handleToggleArrayField = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: ArrayField
	) => {
		const tag = e.currentTarget.value;
		const index = state[field].indexOf(tag);
		const nextField = state[field].slice();

		if (index > -1) {
			nextField.splice(index, 1);
		} else {
			nextField.push(tag);
		}

		const payload = {
			[field]: nextField,
		};

		dispatch({ type: "editFilters", object: payload });
	};

	const resetFilters = () => {
		setClear(true);
		tempState.current = state;
		dispatch({ type: "editFilters", object: filtersDefault });
	};

	// Returning
	const searchHandlers = {
		handleLocationChange,
		handleDateChange,
		handleGuestChange,
	};

	const filterHandlers = {
		handleToggleBooleanField,
		handleToggleArrayField,
	};

	const providerProps: IURLParamsProviderProps = {
		variables,
		state,
		history,
		submitNewQuery,
		handleOpenEdit,
		handleCloseEdit,
		handleOpenEditMenu,
		handleCloseEditMenu,
		resetFilters,
		searchHandlers,
		filterHandlers,
		activeNumFilters,
	};

	return (
		<URLParamsContext.Provider value={providerProps}>
			{children}
		</URLParamsContext.Provider>
	);
};

const useURLParams = () => {
	const context = useContext(URLParamsContext);
	if (context === undefined) {
		throw new Error("useURLParams must be used within a URLParamsProvider");
	}

	return context;
};

export { URLParamsProvider, useURLParams };
