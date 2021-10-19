import { addDays, subDays } from "date-fns";
import { Maybe } from "../generated/graphql";

const disableDay = (date: Date) => {
	return date < new Date();
};

const disableListingDay = (date: Date, datesUnavailable: Maybe<string>[]) => {
	return (
		date < new Date() ||
		datesUnavailable.includes(date.toLocaleDateString())
	);
};

const disableListingCheckoutDays = (
	date: Date,
	pickedDate: Date,
	checkInMin: Date,
	checkOutMax: Date
) => {
	return (
		date < new Date() ||
		date <= subDays(pickedDate, 7) ||
		date >= addDays(pickedDate, 7) ||
		date <= checkInMin ||
		date >= checkOutMax
	);
};

const disableListingFutureDays = (date: Date, pickedDate: Date) => {
	return date <= subDays(pickedDate, 7) || date >= addDays(pickedDate, 7);
};

export {
	disableDay,
	disableListingDay,
	disableListingCheckoutDays,
	disableListingFutureDays,
};
