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

const ItemDetailsDesktop = ({
	listing,
	checkIn,
	checkOut,
	renderReviewScore,
}: Props) => {
	const renderPlural = (num: number) => {
		if (num > 1) {
			return "s";
		}
	};

	const { numGuests, numBedrooms, numBeds, numBaths } = listing;

	return (
		<div className="SearchResultsItem__details SearchResultsItem__details--desktop">
			<div className="type">
				<span>{listing.listingType}</span>
				<span> in </span>
				<span>{listing.city}</span>
			</div>
			<div className="title">
				<span>{listing.title}</span>
			</div>
			<div className="divider"></div>
			<div className="details">
				<div>
					<span>
						{numGuests} guest{renderPlural(numGuests)}
					</span>
					<span> · </span>
					<span>
						{numBedrooms > 0
							? `${numBedrooms} bedroom${renderPlural(numBedrooms)}`
							: "studio"}
					</span>
					<span> · </span>
					<span>
						{numBeds} bed{renderPlural(numBeds)}
					</span>
					<span> · </span>
					<span>
						{numBaths} bath{renderPlural(numBaths)}
					</span>
				</div>
			</div>
			<div className="amenities">
				{listing.basicAmenities?.flatMap((amenity, idx, array) => {
					return array.length - 1 !== idx
						? [amenity, " · "]
						: amenity;
				})}
			</div>
			<div className="score-price">
				<div className="score">
					<StarSvg />
					<span>{renderReviewScore()}</span>
					<span>({listing.reviewsCount})</span>
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
		</div>
	);
};

export default ItemDetailsDesktop;
