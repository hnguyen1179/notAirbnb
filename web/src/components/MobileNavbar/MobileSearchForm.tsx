import { useState } from "react";
import { createPortal } from "react-dom";
import { OnDateRangeChangeProps } from "react-date-range";
import { addDays, format } from "date-fns";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { RouteComponentProps, withRouter } from "react-router";
import { History } from "history";

import MobileEditLocation from "./MobileEditLocation";
import MobileEditDates from "./MobileEditDates";
import MobileEditGuests from "./MobileEditGuests";
interface Props extends RouteComponentProps {
	handleFormClose: () => void;
	history: History;
}

export interface IDate {
	startDate: Date;
	endDate: Date;
	key: string;
}

export interface ISearchPayload {
	region: string;
	checkIn: string;
	checkOut: string;
	guests: number;
}

const MobileSearchForm = ({ handleFormClose, history }: Props) => {
	const [location, setLocation] = useState("");
	const [dates, setDates] = useState<IDate>({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});
	const [guests, setGuests] = useState(0);
	const [stage, setStage] = useState("location");

	const handleDateChange = (ranges: OnDateRangeChangeProps) => {
		const start = ranges.selection.startDate as Date;
		const end = ranges.selection.endDate as Date;

		setDates({ ...dates, startDate: start, endDate: end });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const sameDates =
			dates.startDate.toDateString() === dates.endDate.toDateString();

		const checkIn = format(dates.startDate, "M-d-yyyy");
		const checkOut = sameDates
			? format(addDays(dates.endDate, 1), "M-d-yyyy")
			: format(dates.endDate, "M-d-yyyy");

		const search = new URLSearchParams({
			region: location.split(", ")[0],
			"check-in": checkIn,
			"check-out": checkOut,
			guests: guests.toString(),
			page: "1",
		});

		document.body.style.overflow = "initial";

		sessionStorage.setItem("params", search.toString());

		history.push({
			pathname: "/search",
			search: search.toString(),
		});
	};

	const renderStage = (page: string) => {
		switch (page) {
			case "location":
				return (
					<MobileEditLocation
						handleFormClose={handleFormClose}
						location={location}
						setLocation={setLocation}
						setStage={setStage}
					/>
				);

			case "dates":
				return (
					<MobileEditDates
						dates={dates}
						handleDateChange={handleDateChange}
						setStage={setStage}
					/>
				);

			case "guests":
				return (
					<MobileEditGuests
						handleSubmit={handleSubmit}
						location={location}
						dates={dates}
						guests={guests || 0}
						setGuests={setGuests}
						setStage={setStage}
					/>
				);

			default:
				return (
					<div className="MobileSearchForm__form__stage MobileSearchForm__form__stage--location">
						{renderStage(stage)}
					</div>
				);
		}
	};

	return createPortal(
		<div className="MobileSearchForm">
			<form className="MobileSearchForm__form">{renderStage(stage)}</form>
		</div>,
		document?.querySelector("#root") as Element
	);
};

export default withRouter(MobileSearchForm);
