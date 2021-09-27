import { useState, useEffect, useRef } from "react";
import { History } from "history";

import { ReactComponent as BackSvg } from "../../assets/icons/back.svg";
import { ReactComponent as FilterSvg } from "../../assets/icons/filter.svg";
import { ReactComponent as NegativeSvg } from "../../assets/icons/negative.svg";

import Navbar from "../Navbar/Navbar";
import MobileEditLocation from "../MobileNavbar/MobileEditLocation";
import MobileEditDates from "../MobileNavbar/MobileEditDates";
import MobileEditGuests from "../MobileNavbar/MobileEditGuests";

import { IDate } from "../../components/MobileNavbar/MobileSearchForm";
import { OnDateRangeChangeProps } from "react-date-range";
import { createPortal } from "react-dom";
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
}: Props) => {
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
	const [filters, setFilters] = useState({});

	// Close top bar on scorll
	useEffect(() => {
		window.addEventListener("scroll", handleCloseEdit);
		return () => {
			window.removeEventListener("scroll", handleCloseEdit);
		};
	}, []);

	// Opening edit menu makes pageunscrollable
	useEffect(() => {
		if (Object.values(editMenu).some((menu) => !!menu)) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [editMenu, setEditMenu]);

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

		history.push({
			pathname: history.location.pathname,
			search: nextSearch.toString(),
		});
	}, [location, nextDates.current, nextGuests.current]);

	const handleBack = () => {
		history.goBack();
	};

	const handleOpenEditMenu = (field: "location" | "dates" | "guests") => {
		const newEditMenuState = {
			...editMenuDefault,
		};

		newEditMenuState[field] = true;

		setEditMenu(newEditMenuState);
	};

	const handleEditFilter = () => {};

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
							onClick={() =>
								setEditMenu({ ...editMenuDefault, tags: true })
							}
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
