import { FormEvent, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { ReactComponent as SearchSvg } from "../../assets/icons/thick-search.svg";
import { DateRange, OnDateRangeChangeProps } from "react-date-range";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { disableDay, disablePastAWeek } from "../../utils/disableDays";
import LocationSearch from "../LocationSearch/LocationSearch";
import { useHistory } from "react-router";
import { addDays, format } from "date-fns";
import { BasicSearchVariables } from "../../pages/SearchPage";

interface IDate {
	startDate: Date;
	endDate: Date;
	key: string;
}

const ID_ARRAY = ["location", "startDate", "endDate", "guests"];
const LOCATIONS = [
	"Anywhere",
	"Big Bear, CA",
	"Henderson, NV",
	"Las Vegas, NV",
	"Los Angeles, CA",
	"Palm Springs, CA",
	"Paradise, NV",
	"San Diego, CA",
	"Santa Barbara, CA",
];

interface Props {
	filters?: BasicSearchVariables;
	handleLocationChange?: (location: string) => void;
	handleDateChange?: (ranges: OnDateRangeChangeProps) => void;
	handleGuestChange?: (value: number) => void;
	submitNewQuery?: () => void;
	handleCloseNavigation?: () => void;
}

const DEFAULT_DATE = new Date().toLocaleDateString();

const SearchForm = ({
	filters,
	handleLocationChange: setReducerLocation,
	handleDateChange: setReducerDate,
	handleGuestChange: setReducerGuest,
	submitNewQuery,
	handleCloseNavigation,
}: Props) => {
	const [focusedRange, setFocusedRange] = useState<[number, number]>([0, 0]);
	const [focusInput, setFocusInput] = useState(-1);
	const [error, setError] = useState(-1);
	const [showRdr, setShowRdr] = useState(false);
	const [dates, setDates] = useState<IDate>({
		startDate: filters ? new Date(filters.checkIn) : new Date(),
		endDate: filters ? new Date(filters.checkOut) : new Date(),
		key: "selection",
	});

	useEffect(() => {
		if (error === -1) return;
		const timer = setTimeout(() => {
			setError(-1);
		}, 1500);

		return () => {
			clearTimeout(timer);
		};
	}, [error]);

	const history = useHistory();
	const selectedRef = useRef(0);
	const form = useForm();

	useEffect(() => {
		form.setValue("location", filters ? filters.region : "");
		form.setValue("guests", filters ? filters.guests : undefined);
	}, [form, filters]);

	const next = () => {
		setFocusInput(1);
		setShowRdr(true);
	};

	const handleInputClick = (e: { currentTarget: HTMLElement }) => {
		const id = e.currentTarget?.getAttribute("id") as string;
		form.setFocus(id);
		setFocusInput(ID_ARRAY.indexOf(id));

		if (id === "startDate") {
			handleClickStartDate(e);
		} else if (id === "endDate") {
			handleClickEndDate(e);
		} else {
			setShowRdr(false);
		}
	};

	const handleBodyClick = () => {
		const closeCalendar = new Event("closeCalendar");
		window.dispatchEvent(closeCalendar);
	};

	const handleCloseCalendar = () => {
		setShowRdr(false);
		setFocusInput(-1);
	};

	useEffect(() => {
		window.addEventListener("closeCalendar", handleCloseCalendar);
		document.body.addEventListener("click", handleBodyClick);

		return () => {
			window.removeEventListener("closeCalendar", handleCloseCalendar);
			document.body.removeEventListener("click", handleBodyClick);
		};
	}, []);

	// Clicking on the startDate allows you to edit the start date
	const handleClickStartDate = (e: any) => {
		setShowRdr(true);
		setFocusedRange([0, 0]);
	};

	// Clicking on the endDate allows you to edit the end date
	const handleClickEndDate = (e: any) => {
		setShowRdr(true);
		setFocusedRange([0, 1]);
	};

	// Prevents the calendar from jumping back and forth between start and end date
	const handleRangeFocusChange = (range: [x: number, y: number]) => {
		// This function is ran right before the change in state

		// If it just selected startDate and not yet endDate; jump focus to endDate
		if (range[1] === 1 && selectedRef.current === 1) {
			setFocusedRange([0, 1]);
			setFocusInput(2);
		}

		if (range[1] === 0 && selectedRef.current === 1) {
			setFocusedRange([0, 0]);
			setFocusInput(1);
		}

		if (selectedRef.current === 2) {
			setShowRdr(false);
			setFocusInput(3);
		}
	};

	const handleDateChange = (ranges: OnDateRangeChangeProps) => {
		const start = ranges.selection.startDate as Date;
		const end = ranges.selection.endDate as Date;

		if (
			focusedRange.toString() === [0, 1].toString() &&
			!selectedRef.current
		) {
			setDates({ ...dates, startDate: end, endDate: end });
		} else {
			setDates({ ...dates, startDate: start, endDate: end });
		}

		setReducerDate && setReducerDate(ranges);

		selectedRef.current += 1;
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const location = form.getValues("location");
		const checkIn = dates.startDate;
		const checkOut = dates.endDate;
		const guests = form.getValues("guests");
		const locationRegex = new RegExp(location, "i");

		if (
			location === "" ||
			!LOCATIONS.some((loc) => locationRegex.test(loc))
		) {
			setError(0);
			return;
		} else if (
			dates.startDate.toLocaleDateString() ===
				new Date().toLocaleDateString() &&
			dates.endDate.toLocaleDateString() ===
				new Date().toLocaleDateString()
		) {
			setError(1);
			return;
		} else if (!guests || guests < 1) {
			setError(3);
			return;
		}

		const sameDates = checkIn.toString() === checkOut.toString();
		const search = new URLSearchParams({
			region: location.split(", ")[0],
			"check-in": format(checkIn, "M-d-yyyy"),
			"check-out": sameDates
				? format(addDays(checkOut, 1), "M-d-yyyy")
				: format(checkOut, "M-d-yyyy"),
			guests: guests.toString(),
			page: "1",
		});

		sessionStorage.setItem("params", search.toString());

		history.push({
			pathname: "/search",
			search: search.toString(),
		});
	};

	const displayClass = (base: string, idx: number) => {
		let output = base;

		if (error === idx) output += " error";
		if (focusInput === idx) output += " focused";

		return output;
	};

	const defaultDate =
		dates.startDate.toLocaleDateString() === DEFAULT_DATE &&
		dates.endDate.toLocaleDateString() === DEFAULT_DATE;

	const selectCheckout =
		dates.startDate.toLocaleDateString() ===
		dates.endDate.toLocaleDateString();

	const handleDisableDayLogic = (date: Date) => {
		if (defaultDate) {
			return disableDay(date);
		} else if (selectCheckout) {
			return disablePastAWeek(date, dates.startDate);
		}
		return disableDay(date);
	};

	const handleSubmitNewQuery = () => {
		if (handleCloseNavigation && submitNewQuery) {
			handleCloseNavigation();
			submitNewQuery();
		}
	};

	return (
		<div className="SearchForm">
			<form
				className={`SearchForm__container ${
					focusInput !== -1 ? "active" : ""
				}`}
			>
				{/* Location Search */}
				<div
					className={displayClass(
						"SearchForm__container__input-container",
						0
					)}
					id="location"
					onClick={handleInputClick}
				>
					<div className="SearchForm__container__input-container__input">
						<label htmlFor="location">Location</label>
						{setReducerLocation ? (
							// SearchPage
							<LocationSearch
								form={form}
								setLocation={setReducerLocation}
								next={next}
							/>
						) : (
							// LandingPage
							<LocationSearch form={form} next={next} />
						)}
					</div>
				</div>

				<span className="divider" />

				{/* Dates Search */}
				<div
					className={displayClass(
						"SearchForm__container__input-container",
						1
					)}
					id="startDate"
					onClick={handleInputClick}
				>
					<div className="SearchForm__container__input-container__input">
						<label htmlFor="startDate">Check in</label>
						<input
							type="text"
							placeholder="Add dates"
							id="startDate"
							value={
								filters
									? dates.startDate?.toLocaleDateString() ===
									  new Date().toLocaleDateString()
										? ""
										: dates.startDate.toLocaleDateString()
									: selectedRef.current >= 1
									? dates.startDate?.toLocaleDateString()
									: ""
							}
							readOnly={true}
							{...form.register("startDate")}
						/>
					</div>
				</div>

				<span className="divider" />

				<div
					className={`SearchForm__container__input-container ${
						focusInput === 2 ? "focused" : ""
					} ${error === 1 ? "error" : ""}`}
					id="endDate"
					onClick={handleInputClick}
				>
					<div className="SearchForm__container__input-container__input">
						<label htmlFor="endDate">Check out</label>
						<input
							type="text"
							placeholder="Add dates"
							id="endDate"
							value={
								filters
									? dates.endDate?.toLocaleDateString() ===
									  new Date().toLocaleDateString()
										? ""
										: dates.endDate.toLocaleDateString()
									: selectedRef.current >= 1
									? dates.endDate?.toLocaleDateString()
									: ""
							}
							readOnly={true}
							{...form.register("endDate")}
						/>
					</div>
				</div>

				<span className="divider" />

				{/* Num Guests Search */}
				<div
					className={displayClass(
						"SearchForm__container__input-container",
						3
					)}
					id="guests"
					onClick={handleInputClick}
				>
					<div className="SearchForm__container__input-container__input">
						<label htmlFor="guests">Guests</label>
						{setReducerGuest ? (
							// Search Page
							<input
								type="number"
								min="1"
								placeholder="Add guests"
								id="guests"
								autoComplete={"off"}
								{...form.register("guests")}
								onChange={(e) =>
									setReducerGuest(parseInt(e.target.value))
								}
							/>
						) : (
							// Landing Page
							<input
								type="number"
								min="1"
								placeholder="Add guests"
								id="guests"
								autoComplete={"off"}
								{...form.register("guests")}
							/>
						)}
					</div>
					<div className="button-placeholder"></div>
				</div>

				<button
					aria-label="Search"
					className="SearchForm__container__input-container__button SearchForm__container__input-container__button--decoy"
					type="submit"
					onClick={(e) => {
						e.preventDefault();
						submitNewQuery
							? handleSubmitNewQuery()
							: handleSubmit(e);
					}}
				>
					<SearchSvg />
				</button>
			</form>

			{/* Dates Search Calendars */}
			{showRdr && (
				<div onClick={(e) => e.stopPropagation()}>
					<DateRange
						className="date-range date-range--small"
						focusedRange={focusedRange}
						onRangeFocusChange={handleRangeFocusChange}
						months={1}
						direction={"horizontal"}
						showMonthAndYearPickers={true}
						editableDateInputs={true}
						showDateDisplay={false}
						ranges={[dates]}
						rangeColors={["#00a6de"]}
						onChange={handleDateChange}
						disabledDay={handleDisableDayLogic}
					/>
					<DateRange
						className="date-range date-range--big"
						focusedRange={focusedRange}
						onRangeFocusChange={handleRangeFocusChange}
						months={2}
						direction={"horizontal"}
						showMonthAndYearPickers={true}
						editableDateInputs={true}
						showDateDisplay={false}
						ranges={[dates]}
						rangeColors={["#00a6de"]}
						onChange={handleDateChange}
						disabledDay={handleDisableDayLogic}
					/>
				</div>
			)}
		</div>
	);
};

export default SearchForm;
