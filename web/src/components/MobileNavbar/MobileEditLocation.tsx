import React from "react";
import LocationSearch from "../LocationSearch/LocationSearch";
import { ReactComponent as BackSvg } from "../../assets/icons/back.svg";

interface Props {
	handleFormClose?: () => void;
	location: string;
	setLocation: (location: string) => void;
	setStage?: (stage: string) => void;
}

const MobileEditLocation = ({
	handleFormClose,
	location,
	setLocation,
	setStage,
}: Props) => {
	const handleNext = () => {
		if (setStage) {
			setStage("dates");
		} else {
			handleFormClose && handleFormClose();
		}
  };
  
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
					next={() => handleNext()}
				/>
			</div>
		</div>
	);
};

export default MobileEditLocation;
