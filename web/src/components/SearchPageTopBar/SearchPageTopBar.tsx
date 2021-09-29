import { useState, useEffect, useRef, useReducer } from "react";
import { History } from "history";

import { ReactComponent as BackSvg } from "../../assets/icons/back.svg";
import { ReactComponent as FilterSvg } from "../../assets/icons/filter.svg";
import { ReactComponent as NegativeSvg } from "../../assets/icons/negative.svg";

import Navbar from "../Navbar/Navbar";

import { IDate } from "../../components/MobileNavbar/MobileSearchForm";
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
	const [{ location, dates, guests, edit, editMenu }, dispatch] = useReducer(
		editQueryReducer,
		{
			location: URLParams.region,
			dates: {
				startDate: new Date(URLParams.checkIn),
				endDate: new Date(URLParams.checkOut),
				key: "selection",
			},
			guests: URLParams.guests,
			edit: false,
			editMenu: editMenuDefault,
		}
	);

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
		document.body.style.overflow = "unset";
		dispatch({ type: "closeEdit" });

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

	const backButtonEvent = edit ? handleCloseEdit : handleBack;
	const backButtonSvg = edit ? <NegativeSvg id="close" /> : <BackSvg />;
	const [searchDates, searchGuests = "Add guests"] =
		searchDetails.split(" · ");

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
							edit={edit}
						/>
					</div>

					<CSSTransition
						in={Object.values(editMenu).some(
							(field) => field === true
						)}
						timeout={300}
						unmountOnExit
						classNames="edit-menu__menu"
						nodeRef={menuRef}
					>
						<EditMenuPortal
							editMenu={editMenu}
							menuRef={menuRef}
							handleCloseEditMenu={handleCloseEditMenu}
							location={location}
							setLocation={(value: string) =>
								dispatch({
									type: "field",
									field: "location",
									value,
								})
							}
							dates={dates}
							handleDateChange={handleDateChange}
							guests={guests}
							setGuests={(value: number) =>
								dispatch({
									type: "field",
									field: "guests",
									value,
								})
							}
							edit={edit}
							submitNewQuery={submitNewQuery}
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
