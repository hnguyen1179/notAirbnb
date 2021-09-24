import React from "react";

const MobileEditLocation = () => {
	return (
		<div className="MobileSearchForm__form__stage MobileSearchForm__form__stage--location">
			<button
				className="MobileSearchForm__form__stage__back-button"
				type="button"
				onClick={handleFormClose}
			>
				<BackSvg />
			</button>
			<h2 className="MobileSearchForm__form__stage__title">Location</h2>
			<div className="MobileSearchForm__form__stage__content">
				<LocationSearch
					location={location}
					setLocation={setLocation}
					next={() => setStage("dates")}
				/>
			</div>
		</div>
	);
};

export default MobileEditLocation;
