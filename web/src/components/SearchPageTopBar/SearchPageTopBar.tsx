import { useEffect, useRef, useReducer } from "react";
import { History } from "history";

import { ReactComponent as BackSvg } from "../../assets/icons/back.svg";
import { ReactComponent as FilterSvg } from "../../assets/icons/filter.svg";
import { ReactComponent as NegativeSvg } from "../../assets/icons/negative.svg";

import Navbar from "../Navbar/Navbar";

import { OnDateRangeChangeProps } from "react-date-range";
import { addDays, format } from "date-fns";
import { CSSTransition } from "react-transition-group";
import SearchPageTopBarDropdown from "./SearchPageTopBarDropdown";
import EditMenuPortal from "./EditMenuPortal";
import {
	EditMenuEnum,
	editQueryReducer,
} from "../../reducers/editQueryReducer";

interface URLParams {
	region: string;
	guests: number;
	checkIn: string;
	checkOut: string;
	tags: string[];
	listingType: string[];
	languages: string[];
	smoking: boolean;
	pets: boolean;
	superhost: boolean;
	entire: boolean;
}

interface Props {
	mobile: boolean;
	URLParams: URLParams;
	searchDetails: string;
	history: History;
	openFilter: boolean;
	setOpenFilter: (state: boolean) => void;
}

const editMenuDefault = {
	location: false,
	dates: false,
	guests: false,
	filters: false,
};

const SearchPageTopBar = ({
	mobile,
	URLParams,
	searchDetails,
	history,
	openFilter,
	setOpenFilter,
}: Props) => {
	// For use with CSSTransition; ref based (React way)
	const menuRef = useRef<HTMLDivElement>(null);

	// This bundles the URLParams from SearchPage until one big state for
	// TopBar to manage. When finalized; the their counterpart refs are updated
	const [state, dispatch] = useReducer(editQueryReducer, {
		location: URLParams.region,
		dates: {
			startDate: new Date(URLParams.checkIn),
			endDate: new Date(URLParams.checkOut),
			key: "selection",
		},
		guests: URLParams.guests,
		tags: URLParams.tags || [],
		listingType: URLParams.listingType || [],
		languages: URLParams.languages || [],
		smoking: URLParams.smoking,
		pets: URLParams.pets,
		superhost: URLParams.superhost,
		entire: URLParams.entire,
		edit: false,
		editMenu: editMenuDefault,
	});

	// Close top bar on scroll
	useEffect(() => {
		window.addEventListener("scroll", handleCloseEdit);
		return () => {
			window.removeEventListener("scroll", handleCloseEdit);
		};
	}, []);

	// Listens for openFilter stage change from SearchPage to open filter from bar
	useEffect(() => {
		if (openFilter) {
			dispatch({ type: "openEditMenu", value: "filters" });
		}
	}, [openFilter]);

	// Submits current state to -> new URLParams
	const submitNewQuery = () => {
		// const editFilters = (filters) => {
		// dispatch("editFilters", filters)

		// Todo:... Create a wrapper function that takes in an object of filters
		// and sets the new state of the reducer to the filters. This wrapper function
		// will be given to FiltersEditMenu page, which will be ran after anything
		// is added onto the the current state

		// Maybe not run this wrapper function on every change...
		// run this function to create the new reducer state when you click on
		// "Show Results", and then run the submitNewQuery

		// This might run you into the problem of submiting a new query on the old state
		// since dispatch(...) is asynchronous

		// and then onClick on the
		// "Show Results" button on the filters page, run the submitNewQuery function
		// which pulls the state out of the reducer and sets it onto a new
		// URL Param, and goes to that URL, therefore creating a new search,
		// and updating the incoming props on TopBar to reflect the new URL Params

		// Maybe create a context? Prevent prop dropping the URL Params
		// and perhaps some methods all the way down?
		// useContext and useReducer ??
		// }

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

	const handleBack = () => {
		history.goBack();
	};

	const handleOpenEditMenu = (field: EditMenuEnum) => {
		dispatch({ type: "openEditMenu", value: field });
	};

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

	const handleOpenEdit = () => {
		dispatch({ type: "openEdit" });
	};

	const handleCloseEdit = () => {
		dispatch({ type: "closeEdit" });
	};

	const handleCloseEditMenu = () => {
		document.body.style.overflow = "unset";
		setOpenFilter(false);
		dispatch({ type: "closeEditMenu" });
	};

	const backButtonEvent = state.edit ? handleCloseEdit : handleBack;
	const backButtonSvg = state.edit ? <NegativeSvg id="close" /> : <BackSvg />;
	const [searchDates, searchGuests = "Add guests"] =
		searchDetails.split(" · ");
	console.log("STATE: ", state);
	return (
		<>
			{mobile ? (
				<>
					<div className="SearchPage__top-bar">
						<button
							className="button button--back"
							onClick={backButtonEvent}
						>
							{backButtonSvg}
						</button>
						<button
							className="button button--edit-search"
							onClick={handleOpenEdit}
						>
							<div className="region">
								{URLParams.region ? URLParams.region : "Nearby"}
							</div>
							<div className="date">{searchDetails}</div>
						</button>
						<button
							className="button button--edit-filter"
							onClick={() => handleOpenEditMenu("filters")}
						>
							<FilterSvg />
						</button>

						<SearchPageTopBarDropdown
							handleOpenEditMenu={handleOpenEditMenu}
							region={URLParams.region}
							searchDates={searchDates}
							searchGuests={searchGuests}
							edit={state.edit}
						/>
					</div>

					<CSSTransition
						in={Object.values(state.editMenu).some(
							(field) => field === true
						)}
						timeout={300}
						unmountOnExit
						classNames="edit-menu__menu"
						nodeRef={menuRef}
					>
						<EditMenuPortal
							edit={state.edit}
							editMenu={state.editMenu}
							handleCloseEditMenu={handleCloseEditMenu}
							submitNewQuery={submitNewQuery}
							menuRef={menuRef}
							location={state.location}
							setLocation={(value: string) =>
								dispatch({
									type: "field",
									field: "location",
									value,
								})
							}
							dates={state.dates}
							handleDateChange={handleDateChange}
							guests={state.guests}
							setGuests={(value: number) =>
								dispatch({
									type: "field",
									field: "guests",
									value,
								})
							}
						/>
					</CSSTransition>

					<div className="SearchPage__top-bar--filler" />
				</>
			) : (
				<>
					<Navbar notLanding={true} />
					<div className="Navbar-filler" />
				</>
			)}
		</>
	);
};

export default SearchPageTopBar;
