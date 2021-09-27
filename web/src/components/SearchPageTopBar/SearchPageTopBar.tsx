import React, { useState, useEffect, useRef } from "react";
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

interface Props {
	mobile: boolean;
	region: string;
	guests: number;
	checkIn: string;
	checkOut: string;
	searchDetails: string;
	history: History;
	openFilter: boolean;
	setOpenFilter: (state: boolean) => void;
	// openFilter: any;
}

const editMenuDefault = {
	location: false,
	dates: false,
	guests: false,
	tags: false,
};

const SearchPageTopBar = ({
	mobile,
	region,
	guests: guestsProp,
	checkIn,
	checkOut,
	searchDetails,
	history,
	openFilter,
	setOpenFilter,
}:
Props) => {
	const initialRender = useRef(true);
	const nextDates = useRef({
		checkIn: new Date(checkIn),
		checkOut: new Date(checkOut),
	});
	const nextGuests = useRef(guestsProp);
	const menuRef = useRef<HTMLDivElement>(null);

	const [edit, setEdit] = useState(false);
	const [editMenu, setEditMenu] = useState(editMenuDefault);
	const [location, setLocation] = useState(region);
	const [dates, setDates] = useState<IDate>({
		startDate: new Date(checkIn),
		endDate: new Date(checkOut),
		key: "selection",
	});
	const [guests, setGuests] = useState(guestsProp);

	// Close top bar on scroll
	useEffect(() => {
		window.addEventListener("scroll", handleCloseEdit);
		return () => {
			window.removeEventListener("scroll", handleCloseEdit);
		};
	}, []);

	useEffect(() => {
		if (openFilter) {
			window.addEventListener("scroll", handleCloseEdit);
			setEditMenu({ ...editMenuDefault, tags: true });
		}
	}, [openFilter]);

	useEffect(() => {
		if (initialRender.current) {
			initialRender.current = false;
			return;
		}

		setEdit(false);

		const nextSearch = new URLSearchParams(history.location.search);
		nextSearch.set("region", location.split(", ")[0]);
		nextSearch.set(
			"check-in",
			format(nextDates.current.checkIn, "M-d-yyy")
		);
		nextSearch.set(
			"check-out",
			format(nextDates.current.checkOut, "M-d-yyy")
		);
		nextSearch.set("guests", guests.toString());
		nextSearch.set("page", "1");

		history.push({
			pathname: history.location.pathname,
			search: nextSearch.toString(),
		});
	}, [location, nextDates.current, nextGuests.current]);

	const handleBack = () => {
		history.goBack();
	};

	const handleOpenEditMenu = (
		field: "location" | "dates" | "guests" | "tags"
	) => {
		const newEditMenuState = {
			...editMenuDefault,
		};
		window.addEventListener("scroll", handleCloseEdit);

		newEditMenuState[field] = true;

		setEditMenu(newEditMenuState);
	};

	const handleSubmitGuestsEdit = () => {
		nextGuests.current = guests;

		handleCloseEditMenu();
	};

	const handleSubmitDateEdit = () => {
		let checkOut = dates.endDate;
		if (dates.startDate.toString() === dates.endDate.toString()) {
			checkOut = addDays(dates.endDate, 1);
		}
		nextDates.current = {
			checkIn: dates.startDate,
			checkOut,
		};

		handleCloseEditMenu();
	};

	const handleDateChange = (ranges: OnDateRangeChangeProps) => {
		const start = ranges.selection.startDate as Date;
		const end = ranges.selection.endDate as Date;

		setDates({ ...dates, startDate: start, endDate: end });
	};

	const handleOpenEdit = () => {
		setEdit(true);
	};

	const handleCloseEdit = () => {
		setEdit(false);
	};

	const handleCloseEditMenu = () => {
		document.body.style.overflow = "unset";
		setOpenFilter(false);
		// openFilter.current = false;
		setEditMenu(editMenuDefault);
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
								{region ? region : "Nearby"}
							</div>
							<div className="date">{searchDetails}</div>
						</button>
						<button
							className="button button--edit-filter"
							onClick={() => handleOpenEditMenu("tags")}
						>
							<FilterSvg />
						</button>

						<SearchPageTopBarDropdown
							handleOpenEditMenu={handleOpenEditMenu}
							region={region}
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
							setLocation={setLocation}
							dates={dates}
							handleDateChange={handleDateChange}
							handleSubmitDateEdit={handleSubmitDateEdit}
							guests={guests}
							setGuests={setGuests}
							handleSubmitGuestsEdit={handleSubmitGuestsEdit}
							edit={edit}
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
