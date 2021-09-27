import { FormEvent } from "react";
import NumberGuests from "./NumberGuests";
import { ReactComponent as BackSvg } from "../../assets/icons/back.svg";
import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg";
import { IDate } from "./MobileSearchForm";

interface Props {
	handleCloseForm?: () => void;
	setStage?: (stage: string) => void;
	handleSubmit?: (e: any) => void;
	location: string;
	dates: IDate;
	guests: number;
	setGuests: (guests: number) => void;
	submitEdit?: () => void;
}

const MobileEditGuests = ({
	handleCloseForm,
	setStage,
	handleSubmit,
	location,
	dates,
	guests,
  setGuests,
  submitEdit
}: Props) => {
	const handleBack = (e: FormEvent) => {
		e.preventDefault();

		if (setStage) {
			setStage("dates");
		} else {
			handleCloseForm && handleCloseForm();
		}
	};

	const handleNext = (e: FormEvent) => {
		e.preventDefault();
		if (handleSubmit) {
			handleSubmit(e);
    } else {
      submitEdit && submitEdit();
    }
	};

	const renderNumGuests = () => {
		let string = " ";
		if (guests > 0) {
			string = guests.toString();
			if (guests > 1) {
				string += " guests";
			} else {
				string += " guest";
			}
		}
		return string;
	};

	return (
		<div className="MobileSearchForm__form__stage MobileSearchForm__form__stage--guests">
			<button
				className="MobileSearchForm__form__stage__back-button"
				type="button"
				onClick={handleBack}
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
					onClick={handleNext}
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
