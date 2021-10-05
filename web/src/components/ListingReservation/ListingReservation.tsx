import { formatDistance } from "date-fns";
import { DateRange, OnDateRangeChangeProps } from "react-date-range";
import { IDates } from "../../context/AppContext";
import { useURLParams } from "../../context/URLParamsContext";
import { Maybe } from "../../generated/graphql";
import { disableDay, disableListingDay } from "../../utils/disableDays";

interface Props {
	city: string;
	datesUnavailable: Maybe<string>[];
}

const DEFAULT_DATE = new Date().toLocaleDateString();

const ListingReservation = (props: Props) => {
	const { state, searchHandlers: { handleDateChange } } = useURLParams();

	const defaultDate =
		state.dates.startDate.toLocaleDateString() === DEFAULT_DATE;
	const checkIn = state.dates.startDate;
	const checkOut = state.dates.endDate;

	const renderDates = () => {
		if (defaultDate) return <h2>Select dates for your trip</h2>;

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
					className=""
					months={1}
					direction={"horizontal"}
					showMonthAndYearPickers={true}
					editableDateInputs={true}
					showDateDisplay={false}
					ranges={[state.dates]}
					rangeColors={["#00a6de"]}
					onChange={handleDateChange}
					disabledDay={(date) =>
						disableListingDay(date, props.datesUnavailable)
					}
				/>
			</div>
		</div>
	);
};

export default ListingReservation;
