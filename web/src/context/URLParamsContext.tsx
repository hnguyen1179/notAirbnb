import { createContext, useContext, useReducer, useEffect } from "react";
import { History } from "history";
import {
	EditMenuEnum,
	editQueryReducer,
	EditQueryState,
} from "../reducers/editQueryReducer";
import { BasicSearchVariables } from "../pages/SearchPage";
import { addDays, format } from "date-fns";
import { OnDateRangeChangeProps } from "react-date-range";

interface IURLParamsProviderProps {
	state: EditQueryState;
	history: History<any>;
	submitNewQuery: () => void;
	handleOpenEdit: () => void;
	handleCloseEdit: () => void;
	handleOpenEditMenu: (menu: EditMenuEnum) => void;
	handleCloseEditMenu: () => void;
	searchHandlers: {
		handleLocationChange: (value: string) => void;
		handleDateChange: (ranges: OnDateRangeChangeProps) => void;
		handleGuestChange: (value: number) => void;
	};
	filterHandlers: {
		handleToggleEntire: (e: React.ChangeEvent<HTMLInputElement>) => void;
	};
}

export const URLParamsContext = createContext<
	IURLParamsProviderProps | undefined
>(undefined);

const editMenuDefault = {
	location: false,
	dates: false,
	guests: false,
	filters: false,
};

interface Props {
	history: History<any>;
	variables: BasicSearchVariables;
	openFilter: boolean;
	setOpenFilter: (state: boolean) => void;
}

const URLParamsProvider: React.FC<Props> = ({
	children,
	history,
	variables,
	openFilter,
	setOpenFilter,
}) => {
	const initialReducerState = {
		...variables,
		tags: variables.tags || [],
		listingType: variables.tags || [],
		languages: variables.tags || [],
		edit: false,
		editMenu: editMenuDefault,
		location: variables.region,
		private: false,
		dates: {
			startDate: new Date(variables.checkIn),
			endDate: new Date(variables.checkOut),
			key: "selection",
		},
	};

	const [state, dispatch] = useReducer(editQueryReducer, initialReducerState);

	useEffect(() => {
		if (openFilter) {
			dispatch({ type: "openEditMenu", value: "filters" });
		}
	}, [openFilter]);

	// Functions involve dispatch/changing reducer state

	// Submits a new search request with new URL Params
	const submitNewQuery = () => {
		const { dates, location, guests } = state;
		document.body.style.overflow = "unset";
		dispatch({ type: "closeEdit" });
		dispatch({ type: "closeEditMenu" });

		let checkOut = dates.endDate;
		if (dates.startDate.toString() === dates.endDate.toString()) {
			checkOut = addDays(dates.endDate, 1);
		}

		const nextSearch = new URLSearchParams(history.location.search);
		nextSearch.set("region", location.split(", ")[0]);
		nextSearch.set("check-in", format(dates.startDate, "M-d-yyy"));
		nextSearch.set("check-out", format(checkOut, "M-d-yyy"));
		nextSearch.set("guests", guests.toString());
		nextSearch.set("page", "1");

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
		dispatch({ type: "closeEdit" });
	};

	// Opens the edit menu; location, dates, guests, filters
	const handleOpenEditMenu = (field: EditMenuEnum) => {
		dispatch({ type: "openEditMenu", value: field });
	};

	// Closes the edit menu
	const handleCloseEditMenu = () => {
		document.body.style.overflow = "unset";
		setOpenFilter(false);
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
	const handleDateChange = (ranges: OnDateRangeChangeProps) => {
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
	const handleToggleEntire = (e: React.ChangeEvent<HTMLInputElement>) => {
		const field = e.currentTarget.value as "entire" | "private";
		const newFilters = {
			[field]: !state[field],
		};
		dispatch({ type: "editFilters", object: newFilters });
	};

	const searchHandlers = {
		handleLocationChange,
		handleDateChange,
		handleGuestChange,
	};

	const filterHandlers = {
		handleToggleEntire,
	};

	// Returning
	const providerProps: IURLParamsProviderProps = {
		state,
		history,
		submitNewQuery,
		handleOpenEdit,
		handleCloseEdit,
		handleOpenEditMenu,
		handleCloseEditMenu,
		searchHandlers,
		filterHandlers,
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
