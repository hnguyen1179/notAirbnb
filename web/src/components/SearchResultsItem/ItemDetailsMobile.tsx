import { numberWithCommas } from "../../utils/numberWithCommas";
import { calculateTotalArgs } from "../../utils/priceBreakdown";
import { ReactComponent as StarSvg } from "../../assets/icons/filled-star.svg";
import { PartialListing } from "./SearchResultsItem";

interface Props {
	listing: PartialListing;
	checkIn: Date;
	checkOut: Date;
	renderReviewScore: () => string | number;
}

const ItemDetailsMobile = ({
	listing,
	checkIn,
	checkOut,
	renderReviewScore,
}: Props) => {
	return (
		<div className="SearchResultsItem__details">
			<div className="score">
				<StarSvg />
				<span>{renderReviewScore()}</span>
				<span>({listing.reviewsCount})</span>
			</div>
			<div className="type">
				<span>{listing.listingType}</span>
				<span> · </span>
				<span>{listing.city}</span>
			</div>
			<div className="title">
				<span>{listing.title}</span>
			</div>
			<div className="price">
				<span>${numberWithCommas(listing.price)}</span>
				<span> / </span>
				<span>night</span>
				<div className="total-price">
					{checkIn < new Date()
						? ""
						: calculateTotalArgs({
								checkIn,
								checkOut,
								pricePerNight: listing.price,
								cleaningFee: listing.cleaningFee,
								region: listing.region,
						  }).totalPrice + " total"}
				</div>
			</div>
		</div>
	);
};

export default ItemDetailsMobile;
