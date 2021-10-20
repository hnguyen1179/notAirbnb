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
	const renderReviewScore = () => {
		if (!listing.reviewsCount) {
			return "No reviews";
		} else if (listing.reviewsCount && !listing.averageScore) {
			return "No scores";
		} else {
			return listing.averageScore;
		}
	};

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
					<div>{renderReviewScore()}</div>
					<div>({listing.reviewsCount} reviews)</div>
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
