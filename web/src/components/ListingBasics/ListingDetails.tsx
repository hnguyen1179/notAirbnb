import { Cloudinary } from "@cloudinary/base";
import { AdvancedImage } from "@cloudinary/react";
import { Link } from "react-router-dom";

interface Props {
	cloudinary: Cloudinary;
	listingType: string;
	hostName: string;
	hostId: string;
	numGuests: number;
	numBedrooms: number;
	numBeds: number;
	numBaths: number;
}

const ListingDetails = (props: Props) => {
	const renderPlural = (num: number, type: string) => {
		if (num > 1) {
			return `${num} ${type}s`;
		} else if (type === "bedroom") {
			return "studio";
		} else {
			return `${num} ${type}`;
		}
	};

	return (
		<div className="ListingDetails">
			<div className="ListingDetails__top">
				<div className="ListingDetails__top__title">
					<div>{props.listingType}</div>
					<div>hosted by {props.hostName}</div>
				</div>

				<div className="ListingDetails__top__host-avatar">
					<Link to={`/host/${props.hostId}`}>
						<AdvancedImage
							cldImg={props.cloudinary.image(
								`host_avatars/${props.hostId}`
							)}
						/>
					</Link>
				</div>
			</div>

			<div className="ListingDetails__nums">
				{renderPlural(props.numGuests, "guest")}
				<span className="spacer">·</span>
				{renderPlural(props.numBedrooms, "bedroom")}
				<span className="spacer">·</span>
				{renderPlural(props.numBeds, "bed")}
				<span className="spacer">·</span>
				{renderPlural(props.numBaths, "bath")}
			</div>
		</div>
	);
};

export default ListingDetails;
