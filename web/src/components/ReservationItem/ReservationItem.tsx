import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { format } from "date-fns";
import { AdvancedImage } from "@cloudinary/react";
import { ReactComponent as RightSvg } from "../../assets/icons/right-arrow.svg";

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
	const { cloudinary } = useContext(AppContext);

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
			<div className="ReservationItem__img-container">
				<AdvancedImage
					className="ReservationItem__img-container__img"
					cldImg={cloudinary.image(
						`images/${region
							.toLocaleLowerCase()
							.replace(" ", "_")}/${listingId}/image-0`
					)}
				/>
			</div>
			<div className="ReservationItem__description">
				<div className="ReservationItem__description__city">
					<span>{`${dateStart} - ${dateEnd}, ${year}`}</span>
					<div>{city}</div>
				</div>
			</div>
			<div className="ReservationItem__title">
				<a href={`/listing/${listingId}`}>
					<div>{title}</div>
					<RightSvg />
				</a>
			</div>
			<button className="ReservationItem__show-button">
				<a href={`/trip/${id}`}>
					<div>Show more trip plans</div>
				</a>
			</button>
		</li>
	);
};

export default ReservationItem;
