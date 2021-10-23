import { FormEvent } from "react";
import { DateRange, OnDateRangeChangeProps } from "react-date-range";
import { ReactComponent as BackSvg } from "../../assets/icons/back.svg";
import { disableDay } from "../../utils/disableDays";
import { IDate } from "./MobileSearchForm";

interface Props {
	handleCloseForm?: () => void;
	setStage?: (stage: string) => void;
	dates: IDate;
	handleDateChange: (ranges: OnDateRangeChangeProps) => void;
	submitEdit?: () => void;
	edit?: boolean;
}

const MobileEditDates = ({
	handleCloseForm,
	setStage,
	dates,
  handleDateChange,
  submitEdit,
	edit,
}: Props) => {
	const handleBack = (e: FormEvent) => {
		e.preventDefault();

		if (setStage) {
			setStage("location");
		} else {
			handleCloseForm && handleCloseForm();
		}
	};

	const handleNext = (e: FormEvent) => {
		e.preventDefault();

		if (setStage) {
			setStage("guests");
		} else {
			submitEdit && submitEdit();
		}
	};

	return (
		<div className="MobileSearchForm__form__stage MobileSearchForm__form__stage--dates">
			<button
				aria-label="Back Button"
				className="MobileSearchForm__form__stage__back-button"
				type="button"
				onClick={handleBack}
			>
				<BackSvg />
			</button>
			<h2 className="MobileSearchForm__form__stage__title">Dates</h2>
			<div className="MobileSearchForm__form__stage__content">
				<DateRange
					className="date-range date-range--mobile-form"
					months={1}
					direction={"horizontal"}
					showMonthAndYearPickers={true}
					editableDateInputs={true}
					ranges={[dates]}
					rangeColors={["#00a6de"]}
					onChange={handleDateChange}
					disabledDay={disableDay}
				/>
			</div>
			<div className="MobileSearchForm__form__stage__footer">
				<button
					className="MobileSearchForm__form__stage__footer__next-button"
					type="button"
					disabled={(() => {
						const today = new Date().toLocaleDateString();
						const start = dates.startDate.toLocaleDateString();
						const end = dates.endDate.toLocaleDateString();

						return today === start && today === end;
					})()}
					onClick={handleNext}
				>
					<span>{edit ? "Search" : "Next"}</span>
				</button>
			</div>
		</div>
	);
};

export default MobileEditDates;
