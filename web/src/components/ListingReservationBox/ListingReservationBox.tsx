import { useEffect, useState } from "react";
import { numberWithCommas } from "../../utils/numberWithCommas";

import { ReactComponent as StarSvg } from "../../assets/icons/filled-star.svg";
import BoxButtons from "./BoxButtons";
import { DateRange } from "react-date-range";
import { Maybe } from "../../generated/graphql";
import { useCalendarLogic } from "../../context/CalendarLogicContext";

interface Props {
	id: string;
	city: string;
	price: number;
	cleaningFee: number;
	region: string;
	numGuests: number;
	maxGuests: number;
	averageScore: number;
	reviewsCount: number;
	datesUnavailable: Maybe<string>[];
}

const ListingReservationBox = (props: Props) => {
	const {
		dates,
		defaultDate,
		focusedRange,
		handleRangeFocusChange,
		handleDateChange,
		handleDisableDayLogic,
		handleResetDates,
		renderDates,
	} = useCalendarLogic();
	const [openCalendar, setOpenCalendar] = useState(false);

	const handleBodyClick = () => {
		const closeNavigation = new Event("closeNavigation");
		window.dispatchEvent(closeNavigation);
	};

	useEffect(() => {
		window.addEventListener("closeNavigation", handleCloseCalendar);
		document.body.addEventListener("click", handleBodyClick);

		return () => {
			window.removeEventListener("closeNavigation", handleCloseCalendar);
			document.body.removeEventListener("click", handleBodyClick);
			handleCloseCalendar();
		};
	}, []);

	const sameDates =
		dates.startDate.toLocaleDateString() ===
		dates.endDate.toLocaleDateString();

	useEffect(() => {
		if (!sameDates) handleCloseCalendar();
	}, [defaultDate, focusedRange, dates, sameDates]);

	const handleOpenCalendar = () => {
		setOpenCalendar(true);
	};

	const handleCloseCalendar = () => {
		setOpenCalendar(false);
	};

	const renderReviewScore = () => {
		if (!props.reviewsCount) {
			return "No reviews";
		} else if (props.reviewsCount && !props.averageScore) {
			return "No scores";
		} else {
			return props.averageScore;
		}
	};

	return (
		<div
			className="ListingReservationBox"
			onClick={(e) => e.stopPropagation()}
		>
			<header className="ListingReservationBox__header">
				<div className="ListingReservationBox__header__price">
					<span>${numberWithCommas(props.price)}</span>{" "}
					<span>/ night</span>
				</div>
				<div className="ListingReservationBox__header__reviews">
					<StarSvg />
					<span>{renderReviewScore()}</span>
					<span>({props.reviewsCount} reviews)</span>
				</div>
			</header>

			<BoxButtons
				id={props.id}
				dates={dates}
				maxGuests={props.maxGuests}
				numGuests={props.numGuests}
				price={props.price}
				cleaningFee={props.cleaningFee}
				region={props.region}
				defaultDate={defaultDate}
				handleOpenCalendar={handleOpenCalendar}
			/>

			<div
				className="ListingReservationBox__calendar-container"
				aria-hidden={!openCalendar}
			>
				<DateRange
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

				<div className="ListingReservationBox__calendar-container__bottom">
					<div className="ListingReservationBox__calendar-container__bottom__dates">
						{renderDates(props.city)}
					</div>

					<div className="ListingReservationBox__calendar-container__bottom__buttons">
						<button
							className="calendar-clear-button"
							onClick={handleResetDates}
						>
							<span>Clear dates</span>
						</button>
						<button
							className="close-button"
							onClick={handleCloseCalendar}
						>
							<span>Close</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListingReservationBox;
