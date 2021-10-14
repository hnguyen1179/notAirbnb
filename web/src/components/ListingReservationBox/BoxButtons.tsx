import { useRef, useState } from "react";
import { DateRange } from "react-date-range";
import { useModal } from "../../context/ModalContext";
import { calculateTotalArgs } from "../../utils/priceBreakdown";
import { IDate } from "../MobileNavbar/MobileSearchForm";
import PriceBreakdown from "./PriceBreakdown";

interface Props {
	dates: IDate;
	maxGuests: number;
	numGuests: number;
	price: number;
	cleaningFee: number;
	region: string;
	defaultDate: boolean;
	handleOpenCalendar: () => void;
}

const BoxButtons = ({
	dates,
	maxGuests,
	numGuests,
	price,
	cleaningFee,
	region,
	defaultDate,
	handleOpenCalendar,
}: Props) => {
	const gradientRef = useRef<HTMLElement>(null);
	const { getCursorPos } = useModal();
	const [guests, setGuests] = useState(numGuests ? numGuests : 1);

	const sameDates =
		dates.startDate.toLocaleDateString() ===
		dates.endDate.toLocaleDateString();

	const priceBreakdown = calculateTotalArgs({
		checkIn: dates.startDate,
		checkOut: dates.endDate,
		pricePerNight: price,
		cleaningFee,
		region,
	});

	return (
		<div className="BoxButtons">
			<div className="BoxButtons__top-container">
				<button
					className="BoxButtons__dates"
					onClick={handleOpenCalendar}
				>
					<div className="input-box input-box--dates">
						<span>CHECK-IN</span>
						<span>
							{defaultDate
								? "Add date"
								: dates.startDate.toLocaleDateString()}
						</span>
					</div>
					<div className="input-box input-box--dates">
						<span>CHECKOUT</span>
						<span>
							{defaultDate
								? "Add date"
								: dates.endDate.toLocaleDateString()}
						</span>
					</div>
				</button>
				<div className="BoxButtons__guests">
					<div className="input-box input-box--guests">
						<span>GUESTS</span>
						<input
							type="number"
							value={guests}
							onChange={(e) => setGuests(+e.target.value)}
							min={1}
							max={maxGuests}
						/>
					</div>
				</div>
			</div>

			<button
				className="BoxButtons__submit-button"
				onMouseMove={(e) => getCursorPos(e, gradientRef.current)}
			>
				<span className="gradient-container">
					<span className="gradient" ref={gradientRef}></span>
				</span>
				<span className="text">Reserve</span>
			</button>

			{!defaultDate && !sameDates && (
				<div className="BoxButtons__price-breakdown">
					<PriceBreakdown priceBreakdown={priceBreakdown} />
				</div>
			)}
		</div>
	);
};

export default BoxButtons;
