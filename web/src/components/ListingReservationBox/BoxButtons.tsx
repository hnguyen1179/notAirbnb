import { useRef, useState } from "react";
import { useHistory } from "react-router";
import { useAppState } from "../../context/AppContext";
import { useModal } from "../../context/ModalContext";
import { useURLParams } from "../../context/URLParamsContext";
import { useCreateReservationMutation } from "../../generated/graphql";
import { LISTING_BY_ID } from "../../graphql/queries/listingById";
import { calculateTotalArgs } from "../../utils/priceBreakdown";
import { IDate } from "../MobileNavbar/MobileSearchForm";
import ListingReservationDesktopButton from "./ListingReservationDesktopButton";
import PriceBreakdown from "./PriceBreakdown";

interface Props {
	id: string;
	dates: IDate;
	maxGuests: number;
	numGuests: number;
	price: number;
	cleaningFee: number;
	region: string;
	defaultDate: boolean;
	handleOpenCalendar?: () => void;
}

const BoxButtons = ({
	id,
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
	const history = useHistory();
	const { mobile, user } = useAppState();
	const { getCursorPos, handleOpenEntry } = useModal();
	const [guests, setGuests] = useState(numGuests ? numGuests : 1);

	const [createReservation] = useCreateReservationMutation({
		onCompleted: (data) => {
			history.push(`/trip/${data.createReservation?.id}`);
		},
		refetchQueries: [LISTING_BY_ID, "listingById"],
	});

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

	const handleAddReservation = async () => {
		const payload = {
			listingId: id,
			dateStart: dates.startDate,
			dateEnd: dates.endDate,
			totalPrice: +priceBreakdown.totalPrice.replaceAll(",", "").slice(1),
		};

		await createReservation({
			variables: {
				data: payload,
			},
		});
	};

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

			<div className="submit-button-container">
				{!mobile ? (
					<ListingReservationDesktopButton
						user={user}
						gradientRef={gradientRef}
						getCursorPos={getCursorPos}
						handleOpenEntry={handleOpenEntry}
						handleAddReservation={handleAddReservation}
					/>
				) : (
					<button
						className="BoxButtons__submit-button"
						onMouseMove={(e) =>
							getCursorPos(e, gradientRef.current)
						}
						onClick={handleAddReservation}
					>
						<span className="gradient-container">
							<span className="gradient" ref={gradientRef}></span>
						</span>
						<span className="text">Reserve</span>
					</button>
				)}
			</div>

			{!defaultDate && !sameDates ? (
				<div className="BoxButtons__price-breakdown">
					<PriceBreakdown priceBreakdown={priceBreakdown} />
				</div>
			) : null}
		</div>
	);
};

export default BoxButtons;
