import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { ReactComponent as SearchSvg } from "../../assets/icons/thick-search.svg";
import { DateRange, OnDateRangeChangeProps } from "react-date-range";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { disableDay } from "../../utils/disableDays";
import LocationSearch from "../LocationSearch/LocationSearch";
interface FormValues {
	location: string;
	startDate: Date;
	endDate: Date;
	guests: number;
}

interface IDate {
	startDate: Date;
	endDate: Date;
	key: string;
}

const ID_ARRAY = ["location", "startDate", "endDate", "guests"];
const LOCATIONS = [
	"Big Bear, CA",
	"Henderson, NV",
	"Las Vegas, NV",
	"Los Angeles, CA",
	"Palm Springs, CA",
	"Paradise, NV",
	"San Diego, CA",
	"Santa Barbara, CA",
];

const SearchForm = () => {
	const [focusedRange, setFocusedRange] = useState<[number, number]>([0, 0]);
	const [focusInput, setFocusInput] = useState(-1);
	const [showRdr, setShowRdr] = useState(false);
	const [dates, setDates] = useState<IDate>({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});

	const selectedRef = useRef(0);

	const form = useForm();

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

		selectedRef.current += 1;
	};

	const handleSubmit = (e: React.FormEvent) => {
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
			setFocusInput(0);
		} else if (
			checkIn.toLocaleDateString() === new Date().toLocaleDateString() &&
			checkOut.toLocaleDateString() === new Date().toLocaleDateString()
		) {
			setFocusInput(1);
		} else if (guests < 1) {
			setFocusInput(3);
		} else {
			// Submit this; it's successful
		}
	};

	return (
		<div className="SearchForm">
			<form
				className={`SearchForm__container ${
					focusInput !== -1 ? "active" : ""
				}`}
			>
				<div
					className={`SearchForm__container__input-container ${
						focusInput === 0 ? "focused" : ""
					}`}
					id="location"
					onClick={handleInputClick}
				>
					<div className="SearchForm__container__input-container__input">
						<label htmlFor="location">Location</label>
						<LocationSearch form={form} next={next} />
					</div>
				</div>

				<span className="divider" />

				{/* Dates */}
				<div
					className={`SearchForm__container__input-container ${
						focusInput === 1 ? "focused" : ""
					}`}
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
								selectedRef.current >= 2
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
					}`}
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
								selectedRef.current >= 2
									? dates.endDate?.toLocaleDateString()
									: ""
							}
							readOnly={true}
							{...form.register("endDate")}
						/>
					</div>
				</div>

				<span className="divider" />

				{/* Num Guests */}
				<div
					className={`SearchForm__container__input-container ${
						focusInput === 3 ? "focused" : ""
					}`}
					id="guests"
					onClick={handleInputClick}
				>
					<div className="SearchForm__container__input-container__input">
						<label htmlFor="guests">Guests</label>
						<input
							type="number"
							min="1"
							placeholder="Add guests"
							id="guests"
							autoComplete={"off"}
							{...form.register("guests")}
						/>
					</div>
					<div className="button-placeholder"></div>
				</div>

				<button
					className="SearchForm__container__input-container__button SearchForm__container__input-container__button--decoy"
					type="submit"
					onClick={handleSubmit}
				>
					<SearchSvg />
				</button>
			</form>
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
						disabledDay={disableDay}
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
						disabledDay={disableDay}
					/>
				</div>
			)}
		</div>
	);
};

export default SearchForm;
