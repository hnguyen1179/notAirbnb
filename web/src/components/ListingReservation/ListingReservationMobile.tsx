import { MouseEvent, RefObject, useEffect } from "react";
import { ReactComponent as StarSvg } from "../../assets/icons/filled-star.svg";
import { useCalendarLogic } from "../../context/CalendarLogicContext";
import { usePortal } from "../../hooks/usePortal";
import { showMoreStyle } from "../../pages/ListingPage";
import ListingShowMore from "../ListingShowMore/ListingShowMore";
import { IDate } from "../MobileNavbar/MobileSearchForm";
import ListingReservationMobileButton from "./ListingReservationMobileButton";
import ReservationConfirmation from "./ReservationConfirmation";

interface Props {
	dates: IDate;
	id: string;
	price: number;
	cleaningFee: number;
	averageScore: number;
	reviewsCount: number;
	region: string;
	numGuests: number;
	maxGuests: number;
	calendarRef: RefObject<HTMLElement>;
}

const ListingReservationMobile = (props: Props) => {
	const { Portal, portalProps, openPortal, closePortal } = usePortal();
	const { defaultDate, selectCheckout } = useCalendarLogic();

	// On unmount; close the portal entirely
	useEffect(() => {
		return () => {
			closePortal();
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleClickCheckAvailability = () => {
		props.calendarRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const handleClickReserve = (e: MouseEvent<HTMLButtonElement>) => {
		props.calendarRef.current?.scrollIntoView();
		openPortal(e);
	};

	const renderReviewScore = () => {
		if (!props.reviewsCount) {
			return "No reviews";
		} else if (props.reviewsCount && !props.averageScore) {
			return "No scores";
		} else {
			return props.averageScore;
		}
	};

	const renderDates = () => {
		const start = props.dates.startDate.toLocaleDateString("en", {
			month: "short",
			day: "numeric",
		});
		const end = props.dates.endDate.toLocaleDateString("en", {
			month: "short",
			day: "numeric",
		});

		let output = `${start} - ${end}`;
		if (props.dates.endDate.getFullYear() === 2022) output += " 2022";

		return output;
	};

	const datesPicked = !defaultDate && !selectCheckout;

	return (
		<div className="ListingReservationMobile">
			<div className="ListingReservationMobile__details">
				<div className="ListingReservationMobile__details__price">
					<span className="price">${props.price}</span>{" "}
					<span>/ night</span>
				</div>
				{datesPicked ? (
					<div className="ListingReservationMobile__details__dates">
						<span>{renderDates()}</span>
					</div>
				) : (
					<div className="ListingReservationMobile__details__reviews">
						<StarSvg />
						<span className="score">{renderReviewScore()}</span>
						<span className="reviews-count">
							({props.reviewsCount} reviews)
						</span>
					</div>
				)}
			</div>
			<div className="ListingReservationMobile__button-container">
				<ListingReservationMobileButton
					datesPicked={datesPicked}
					handleClickCheckAvailability={handleClickCheckAvailability}
					handleClickReserve={handleClickReserve}
				/>
			</div>

			<Portal {...portalProps} style={showMoreStyle} configType="default">
				<ListingShowMore
					closePortal={closePortal}
					className="ShowListingReservationMobile"
				>
					{(_containerRef) => (
						<ReservationConfirmation
							defaultDate={defaultDate}
							{...props}
						/>
					)}
				</ListingShowMore>
			</Portal>
		</div>
	);
};

export default ListingReservationMobile;
