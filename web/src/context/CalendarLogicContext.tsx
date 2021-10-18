import { formatDistance } from "date-fns";
import { useState, createContext, useContext, useMemo, useEffect } from "react";
import { IDate } from "../components/MobileNavbar/MobileSearchForm";
import { Maybe } from "../generated/graphql";
import {
	disableListingCheckoutDays,
	disableListingDay,
	disableListingFutureDays,
} from "../utils/disableDays";

type TFocusedRange = [number, number];

interface ICalendarLogicContext {
	defaultDate: boolean;
	selectCheckout: boolean;
	future: boolean;
	dates: IDate;
	focusedRange: TFocusedRange;
	handleRangeFocusChange: (range: TFocusedRange) => void;
	handleDateChange: (ranges: any) => void;
	handleDisableDayLogic: (date: Date) => boolean;
	handleResetDates: () => void;
	renderDates: (city: string) => JSX.Element;
}

interface Props {
	dates: IDate;
	handleDateChange: (ranges: any) => void;
	datesUnavailable: Maybe<string>[];
}

const initialState: any = {};
const CalendarLogicContext = createContext<ICalendarLogicContext>(initialState);

const DEFAULT_DATE = new Date().toLocaleDateString();

const CalendarLogicProvider: React.FC<Props> = (props) => {
	const [focusedRange, setFocusedRange] = useState<[number, number]>([0, 0]);
	const [checkOutMaxIdx, setCheckOutMaxIdx] = useState(1);
	const [checkOutMax, setCheckOutMax] = useState(new Date());

	const defaultDate =
		props.dates.startDate.toLocaleDateString() === DEFAULT_DATE &&
		props.dates.endDate.toLocaleDateString() === DEFAULT_DATE;

	const selectCheckout =
		props.dates.startDate.toLocaleDateString() ===
		props.dates.endDate.toLocaleDateString();

	const future =
		props.dates.startDate > new Date(checkOutMax) &&
		props.dates.startDate.toLocaleDateString() ===
			props.dates.endDate.toLocaleDateString();

	const checkIn = props.dates.startDate;

	const datesBooked = useMemo(
		() =>
			(props.datesUnavailable as string[])
				.map((date) => new Date(date))
				.sort((a, b) => new Date(a).valueOf() - new Date(b).valueOf()),
		[props.datesUnavailable]
	);

	useEffect(() => {
		for (let i = 0; i < datesBooked.length; i++) {
			const current = datesBooked[i];
			if (current > checkIn) {
				setCheckOutMax(current);
				setCheckOutMaxIdx(i);
				break;
			}
		}
	}, [checkIn, datesBooked]);

	const handleRangeFocusChange = (range: TFocusedRange) => {
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
		props.handleDateChange({
			selection: {
				startDate: new Date(),
				endDate: new Date(),
			},
		});

		setFocusedRange([0, 0]);
	};

	const renderDates = (city: string) => {
		if (defaultDate) return <h2>Select dates for your trip</h2>;
		if (selectCheckout) return <h2>Select the other date</h2>;

		const nights = parseInt(
			formatDistance(props.dates.startDate, props.dates.endDate).split(
				" "
			)[0]
		);

		return (
			<h2>
				{nights} night{nights > 1 ? "s" : ""} in {city}
			</h2>
		);
	};

	const value = {
		defaultDate,
		selectCheckout,
		future,
		dates: props.dates,
		focusedRange,
		handleRangeFocusChange,
		handleDateChange: props.handleDateChange,
		handleDisableDayLogic,
		handleResetDates,
		renderDates,
	};

	return (
		<CalendarLogicContext.Provider value={value}>
			{props.children}
		</CalendarLogicContext.Provider>
	);
};

const useCalendarLogic = () => {
	const context = useContext(CalendarLogicContext);

	if (context === undefined) {
		throw new Error(
			"useCalendarLogic must be used within a CalendarLogicProvider"
		);
	}

	return context;
};

export { CalendarLogicProvider, useCalendarLogic };
