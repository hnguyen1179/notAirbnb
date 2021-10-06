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
	checkInMin: Date,
	checkOutMax: Date,
) => {

	return date <= checkInMin || date > checkOutMax;
};

export { disableDay, disableListingDay, disableListingCheckoutDays };
