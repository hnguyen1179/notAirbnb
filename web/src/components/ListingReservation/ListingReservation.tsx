import { formatDistance } from "date-fns";
import { DateRange } from "react-date-range";
import { useCalendarLogic } from "../../context/CalendarLogicContext";
import { Maybe } from "../../generated/graphql";

interface Props {
	city: string;
	datesUnavailable: Maybe<string>[];
}

const ListingReservation = (props: Props) => {
	const {
		dates,
		focusedRange,
		handleRangeFocusChange,
		handleDateChange,
		handleDisableDayLogic,
		handleResetDates,
		renderDates,
	} = useCalendarLogic();

	return (
		<div className="ListingReservation">
			<div className="ListingReservation__nights">
				{renderDates(props.city)}
			</div>
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
					ranges={[dates]}
					rangeColors={["#00a6de"]}
					onChange={handleDateChange}
					disabledDay={handleDisableDayLogic}
				/>
				<DateRange
					className="ListingReservation__calendar__rdr-calendar ListingReservation__calendar__rdr-calendar--double"
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
				<button
					className="calendar-clear-button"
					onClick={handleResetDates}
				>
					<span>Clear dates</span>
				</button>
			</div>
		</div>
	);
};

export default ListingReservation;
