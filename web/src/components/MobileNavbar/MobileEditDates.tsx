import React from "react";

const MobileEditDates = () => {
	return (
		<div className="MobileSearchForm__form__stage MobileSearchForm__form__stage--dates">
			<button
				className="MobileSearchForm__form__stage__back-button"
				type="button"
				onClick={() => setStage("location")}
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
					onClick={(e) => {
						e.preventDefault();
						setStage("guests");
					}}
				>
					<span>Next</span>
				</button>
			</div>
		</div>
	);
};

export default MobileEditDates;
