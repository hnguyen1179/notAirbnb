import { useState, useEffect } from "react";
import { History } from "history";

import { ReactComponent as BackSvg } from "../../assets/icons/back.svg";
import { ReactComponent as FilterSvg } from "../../assets/icons/filter.svg";
import { ReactComponent as NegativeSvg } from "../../assets/icons/negative.svg";
import { ReactComponent as SearchSvg } from "../../assets/icons/small-search.svg";
import { ReactComponent as CalendarSvg } from "../../assets/icons/calendar.svg";
import { ReactComponent as GuestsSvg } from "../../assets/icons/guests.svg";

import Navbar from "../Navbar/Navbar";
import MobileEditLocation from "../MobileNavbar/MobileEditLocation";
import MobileEditDates from "../MobileNavbar/MobileEditDates";
import MobileEditGuests from "../MobileNavbar/MobileEditGuests";

import { IDate } from "../../components/MobileNavbar/MobileSearchForm";
import { OnDateRangeChangeProps } from "react-date-range";
import { createPortal } from "react-dom";

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

	useEffect(() => {
		if (Object.values(editMenu).some((menu) => !!menu)) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [editMenu, setEditMenu]);

	useEffect(() => {
		setEdit(false);
		
		const nextSearch = new URLSearchParams(history.location.search);
		nextSearch.set("region", location.split(", ")[0]);

		history.push({
			pathname: history.location.pathname,
			search: nextSearch.toString(),
		});
	}, [location, dates, guests]);

	const handleBack = () => {
		history.goBack();
	};

	const handleOpenEditLocation = () => {
		setEditMenu({
			...editMenuDefault,
			location: true,
		});
	};

	const handleEditFilter = () => {};

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
							onClick={handleEditFilter}
						>
							<FilterSvg />
						</button>

						<div
							className="SearchPage__top-bar__edit-dropdown"
							aria-hidden={!edit}
						>
							<div className="upper">
								<h2>Edit your search</h2>
							</div>
							<div className="lower">
								<div>
									<button
										className="lower__region"
										onClick={handleOpenEditLocation}
									>
										<div className="item">
											<SearchSvg />
											<span>
												{region ? region : "Nearby"}
											</span>
										</div>
									</button>
									<div className="lower__date-guests">
										<button className="date">
											<div className="item">
												<CalendarSvg />
												<span>{searchDates}</span>
											</div>
										</button>
										<button className="guests">
											<div className="item">
												<GuestsSvg />
												<span>{searchGuests}</span>
											</div>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					{createPortal(
						<div
							className="edit-menu edit-menu--location"
							aria-hidden={!editMenu.location}
						>
							<MobileEditLocation
								handleFormClose={handleCloseEditMenu}
								location={location}
								setLocation={setLocation}
							/>
						</div>,
						document?.querySelector("#root") as Element
					)}
					{/* <div>
						<MobileEditDates />
					</div>
					<div>
						<MobileEditGuests />
					</div> */}

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
