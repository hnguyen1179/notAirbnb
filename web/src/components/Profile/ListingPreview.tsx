import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/base";
import { ReactComponent as StarSvg } from "../../assets/icons/filled-star.svg";

import { Listing } from "../../generated/graphql";
import { Link } from "react-router-dom";

interface Props {
	url: string;
	cloudinary: Cloudinary;
	listing: Listing;
}

const ListingPreview = ({ url, cloudinary, listing }: Props) => {
	return (
		<li className="ListingPreview">
			<Link to={`/listing/${listing.id}`}>
				<div className="ListingPreview__image">
					<AdvancedImage cldImg={cloudinary.image(url)} />
				</div>
				<div className="ListingPreview__details">
					<div>
						<StarSvg />
					</div>
					<div>{listing.averageScore}</div>
					<div>({listing.reviewsCount})</div>
				</div>
				<div className="ListingPreview__title">
					<div>{listing.listingType}</div>
					<div>{listing.title}</div>
				</div>
			</Link>
		</li>
	);
};

export default ListingPreview;
