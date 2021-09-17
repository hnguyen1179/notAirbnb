import React from "react";
import { ReactComponent as PlusSvg } from "../../assets/icons/plus.svg";
import { ReactComponent as MinusSvg } from "../../assets/icons/minus.svg";

interface Props {
	guests: number;
	setGuests: (x: number) => void;
}

const NumberGuests = ({ guests, setGuests }: Props) => {
	const subtract = (e: any) => {
		setGuests(guests - 1);
	};

	const add = (e: any) => {
		setGuests(guests + 1);
	};

	return (
		<div className="NumberGuests">
			<div className="NumberGuests__adjust">
				<button
					className="NumberGuests__adjust__button"
					type="button"
					onClick={subtract}
					disabled={guests === 0}
				>
					<MinusSvg />
				</button>

				<div className="NumberGuests__adjust__number">{guests}</div>

				<button
					className="NumberGuests__adjust__button"
					type="button"
					onClick={add}
					disabled={guests === 99}
				>
					<PlusSvg />
				</button>
			</div>
			<div className="NumberGuests__guests">Number of Guests</div>
		</div>
	);
};

export default NumberGuests;
