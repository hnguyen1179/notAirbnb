import { subDays } from "date-fns";

const disableDay = (date: Date) => {
	const yesterday = subDays(new Date(), 1);
	return date < yesterday;
};

export { disableDay };
