import { useState } from "react";
import { useURLParams } from "../../context/URLParamsContext";
import { numberWithCommas } from "../../utils/numberWithCommas";

import { ReactComponent as StarSvg } from "../../assets/icons/filled-star.svg";
import BoxButtons from "./BoxButtons";
import { DateRange } from "react-date-range";
import {
	disableListingDay,
	disableListingFutureDays,
	disableListingCheckoutDays,
} from "../../utils/disableDays";
import { Maybe } from "../../generated/graphql";

interface Props {
	price: number;
	cleaningFee: number;
	region: string;
	maxGuests: number;
	averageScore: number;
	reviewsCount: number;
	datesUnavailable: Maybe<string>[];
}

const DEFAULT_DATE = new Date().toLocaleDateString();

const ListingReservationBox = (props: Props) => {
	const {
		state,
		searchHandlers: { handleDateChange },
	} = useURLParams();

	const [focusedRange, setFocusedRange] = useState<[number, number]>([0, 0]);

	const defaultDate =
		state.dates.startDate.toLocaleDateString() === DEFAULT_DATE &&
		state.dates.endDate.toLocaleDateString() === DEFAULT_DATE;

	const selectCheckout =
		state.dates.startDate.toLocaleDateString() ===
		state.dates.endDate.toLocaleDateString();

	const future =
		state.dates.startDate > new Date(checkOutMax) &&
		state.dates.startDate.toLocaleDateString() === state.dates.endDate.toLocaleDateString();

	const handleRangeFocusChange = (range: [x: number, y: number]) => {
		if (range[1] === 1) {
			setFocusedRange([0, 1]);
		}

		if (range[1] === 0) {
			setFocusedRange([0, 0]);
		}
	};

	// useEffect(() => {
	// 	if (!localStorage.getItem("params")) {
	// 		handleResetDates();
	// 	}
	// }, []);

	const handleDisableDayLogic = (date: Date) => {
		if (defaultDate) {
			return disableListingDay(date, props.datesUnavailable);
		} else if (future) {
			return disableListingFutureDays(date, checkIn);
		} else if (selectCheckout) {
			return disableListingCheckoutDays(
				date,
				checkIn,
				datesBooked[checkOutMaxIdx - 1],
				checkOutMax
			);
		}
		return disableListingDay(date, props.datesUnavailable);
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
		<div className="ListingReservationBox">
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
				dates={state.dates}
				maxGuests={props.maxGuests}
				numGuests={state.guests}
				price={props.price}
				cleaningFee={props.cleaningFee}
				region={props.region}
				defaultDate={defaultDate}
			/>

			<DateRange
				className="ListingReservation__calendar__rdr-calendar"
				focusedRange={focusedRange}
				onRangeFocusChange={handleRangeFocusChange}
				months={1}
				direction={"horizontal"}
				showMonthAndYearPickers={true}
				editableDateInputs={true}
				showDateDisplay={false}
				ranges={[state.dates]}
				rangeColors={["#00a6de"]}
				onChange={handleDateChange}
				disabledDay={handleDisableDayLogic}
			/>
			<button
				className="ListingReservation__calendar__clear-button"
				onClick={handleResetDates}
			>
				<span>Clear dates</span>
			</button>
		</div>
	);
};

export default ListingReservationBox;
