import { formatDistance } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-date-range";
import { useURLParams } from "../../context/URLParamsContext";
import { Maybe } from "../../generated/graphql";
import {
	disableListingCheckoutDays,
	disableListingDay,
	disableListingFutureDays,
} from "../../utils/disableDays";

interface Props {
	city: string;
	datesUnavailable: Maybe<string>[];
}

const DEFAULT_DATE = new Date().toLocaleDateString();

const ListingReservation = (props: Props) => {
	const {
		state,
		searchHandlers: { handleDateChange },
	} = useURLParams();

	useEffect(() => {
		if (!localStorage.getItem('params')) {
			handleResetDates();
		}
	}, [])

	const [focusedRange, setFocusedRange] = useState<[number, number]>([0, 0]);

	const defaultDate =
		state.dates.startDate.toLocaleDateString() === DEFAULT_DATE &&
		state.dates.endDate.toLocaleDateString() === DEFAULT_DATE;

	const selectCheckout =
		state.dates.startDate.toLocaleDateString() ===
		state.dates.endDate.toLocaleDateString();

	const checkIn = state.dates.startDate;
	const checkOut = state.dates.endDate;

	const datesBooked = useMemo(
		() =>
			(props.datesUnavailable as string[])
				.map((date) => new Date(date))
				.sort((a, b) => new Date(a).valueOf() - new Date(b).valueOf()),
		[props.datesUnavailable]
	);

	const [checkOutMaxIdx, setCheckOutMaxIdx] = useState(1);
	const [checkOutMax, setCheckOutMax] = useState(new Date());

	useEffect(() => {
		for (let i = 0; i < datesBooked.length; i++) {
			const current = datesBooked[i];
			if (current > checkIn) {
				setCheckOutMax(current)
				setCheckOutMaxIdx(i);
				break;
			}
		}
	}, [checkIn, datesBooked]);

	const future =
		checkIn > new Date(checkOutMax) &&
		checkIn.toLocaleDateString() === checkOut.toLocaleDateString();

	const handleRangeFocusChange = (range: [x: number, y: number]) => {
		if (range[1] === 1) {
			setFocusedRange([0, 1]);
		}

		if (range[1] === 0) {
			setFocusedRange([0, 0]);
		}
	};

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

	const handleResetDates = () => {
		handleDateChange({
			selection: {
				startDate: new Date(),
				endDate: new Date(),
			},
		});

		setFocusedRange([0, 0]);
	};

	const renderDates = () => {
		if (defaultDate) return <h2>Select dates for your trip</h2>;
		if (selectCheckout) return <h2>Select the other date</h2>;

		const nights = parseInt(
			formatDistance(checkIn, checkOut).split(" ")[0]
		);

		return (
			<h2>
				{nights} night{nights > 1 ? "s" : ""} in {props.city}
			</h2>
		);
	};

	return (
		<div className="ListingReservation">
			<div className="ListingReservation__nights">{renderDates()}</div>
			<div className="ListingReservation__calendar">
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
		</div>
	);
};

export default ListingReservation;
