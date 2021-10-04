import { numberWithCommas } from "../../utils/numberWithCommas";
import { calculateTotalArgs } from "../../utils/priceBreakdown";
import { ReactComponent as StarSvg } from "../../assets/icons/filled-star.svg";
import { PartialListing } from "./SearchResultsItem";

interface Props {
	listing: PartialListing;
	checkIn?: Date;
	checkOut?: Date;
}

const ItemDetailsMobile = ({ listing, checkIn, checkOut }: Props) => {
	const renderReviewScore = () => {
		if (!listing.reviewsCount) {
			return "No reviews";
		} else if (listing.reviewsCount && !listing.averageScore) {
			return "No scores";
		} else {
			return listing.averageScore;
		}
	};

	const renderTotalPrice = () => {
		if (checkIn && checkOut) {
			return checkIn < new Date()
				? " "
				: calculateTotalArgs({
						checkIn,
						checkOut,
						pricePerNight: listing.price,
						cleaningFee: listing.cleaningFee,
						region: listing.region,
				  }).totalPrice + " total";
		} else {
			return "";
		}
	};

	return (
		<div className="SearchResultsItem__details">
			<div className="score">
				<StarSvg />
				<span>{renderReviewScore()}</span>
				<span>({listing.reviewsCount})</span>
			</div>
			<div className="type">
				<span>
					<span>{listing.listingType}</span>
					<span> · </span>
					<span>{listing.city}</span>
				</span>
			</div>
			<div className="title">
				<span>{listing.title}</span>
			</div>
			<div className="price">
				<span>${numberWithCommas(listing.price)}</span>
				<span> / </span>
				<span>night</span>
				<div className="total-price">{renderTotalPrice()}</div>
			</div>
		</div>
	);
};

export default ItemDetailsMobile;
