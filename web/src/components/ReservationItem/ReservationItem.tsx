import { useAppState } from "../../context/AppContext";
import { format } from "date-fns";
import { AdvancedImage } from "@cloudinary/react";
import { ReactComponent as RightSvg } from "../../assets/icons/right-arrow.svg";
import { Link } from "react-router-dom";

interface PartialListing {
	city: string;
	title: string;
	region: string;
}

interface ReservationPartial {
	id: string;
	listingId: string;
	dateStart: string;
	dateEnd: string;
	listing?: PartialListing | undefined | null;
}

interface Props {
	reservation: ReservationPartial | undefined | null;
}

const ReservationItem = ({ reservation }: Props) => {
	const { cloudinary } = useAppState();

	if (!reservation || !reservation.listing) return <></>;

	const dateStart = format(new Date(reservation.dateStart), "MMM d");
	const dateEnd = format(new Date(reservation.dateEnd), "MMM d");
	const year = format(new Date(reservation.dateStart), "yyyy");

	const {
		listing: { region, city, title },
		id,
		listingId,
	} = reservation;

	return (
		<li className="ReservationItem">
			<Link to={`/trip/${id}`}>
				<div className="ReservationItem__img-container">
					<AdvancedImage
						alt="Host submitted image of listing"
						className="ReservationItem__img-container__img"
						cldImg={cloudinary.image(
							`images/${region
								.toLocaleLowerCase()
								.replace(" ", "_")}/${listingId}/image-0`
						)}
						loading="lazy"
					/>
				</div>
			</Link>
			<div className="ReservationItem__description">
				<div className="ReservationItem__description__city">
					<span>{`${dateStart} - ${dateEnd}, ${year}`}</span>
					<div>{city}</div>
				</div>
			</div>
			<div className="ReservationItem__title">
				<Link to={`/trip/${id}`}>
					<div>{title}</div>
					<RightSvg />
				</Link>
			</div>
			<button className="ReservationItem__show-button">
				<Link to={`/trip/${id}`}>
					<div>Show more trip plans</div>
				</Link>
			</button>
		</li>
	);
};

export default ReservationItem;
