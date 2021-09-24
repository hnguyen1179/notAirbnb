import React from "react";
import NumberGuests from "./NumberGuests";

const MobileEditGuests = () => {
	return (
		<div className="MobileSearchForm__form__stage MobileSearchForm__form__stage--guests">
			<button
				className="MobileSearchForm__form__stage__back-button"
				type="button"
				onClick={(e) => {
					e.preventDefault();
					setStage("dates");
				}}
			>
				<BackSvg />
			</button>
			<h2 className="MobileSearchForm__form__stage__title">Guests</h2>
			<div className="MobileSearchForm__form__stage__content">
				<div className="MobileSearchForm__form__stage__content__location">
					{location}
				</div>
				<div className="MobileSearchForm__form__stage__content__dates">
					{dates.startDate.toLocaleDateString()}
					<span className="spacer">-</span>
					{dates.endDate.toLocaleDateString()}
				</div>
				<div className="MobileSearchForm__form__stage__content__guests">
					<span>{renderNumGuests()}</span>
				</div>
				<NumberGuests guests={guests} setGuests={setGuests} />
			</div>
			<div className="MobileSearchForm__form__stage__footer">
				<button
					className="MobileSearchForm__form__stage__footer__next-button MobileSearchForm__form__stage__footer__next-button--submit"
					type="submit"
					onClick={handleSubmit}
					disabled={guests < 1 ? true : false}
				>
					<div>
						<SearchSvg />
						<span>Search</span>
					</div>
				</button>
			</div>
		</div>
	);
};

export default MobileEditGuests;
