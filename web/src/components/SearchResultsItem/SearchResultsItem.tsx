import { Cloudinary } from "@cloudinary/base";
import { AdvancedImage, placeholder, lazyload } from "@cloudinary/react";
import ItemDetailsMobile from "./ItemDetailsMobile";
import ItemDetailsDesktop from "./ItemDetailsDesktop";
import { Maybe } from "../../generated/graphql";

export interface PartialListing {
	__typename?: "Listing" | undefined;
	id: string;
	title: string;
	listingType: string;
	city: string;
	region: string;
	price: number;
	superhost: boolean;
	averageScore: number;
	reviewsCount: number;
	cleaningFee: number;
	basicAmenities: Maybe<string>[];
	numGuests: number;
	numBedrooms: number;
	numBeds: number;
	numBaths: number;
	imageComments: Maybe<string>[];
}

interface Props {
	listing: PartialListing;
	cloudinary: Cloudinary;
	mobile: boolean;
	checkIn: Date;
	checkOut: Date;
}

const SearchResultsItem = ({
	listing,
	cloudinary,
	mobile,
	checkIn,
	checkOut,
}: Props) => {
	const url = `images/${listing.region.replaceAll(" ", "_").toLowerCase()}/${
		listing.id
	}/image-0`;

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
		<li className="SearchResultsItem">
			<a href={`/listing/${listing.id}`}>
				<div className="SearchResultsItem-container">
					<div className="SearchResultsItem__image">
						{listing.superhost && (
							<div className="superhost">
								<span>superhost</span>
							</div>
						)}
						<AdvancedImage
							cldImg={cloudinary.image(url)}
							plugins={[
								placeholder("predominant-color"),
								lazyload(),
							]}
						/>
					</div>
						{mobile ? (
							<ItemDetailsMobile
								listing={listing}
								checkIn={checkIn}
								checkOut={checkOut}
								renderReviewScore={renderReviewScore}
							/>
						) : (
							<ItemDetailsDesktop
								listing={listing}
								checkIn={checkIn}
								checkOut={checkOut}
								renderReviewScore={renderReviewScore}
							/>
						)}
				</div>
			</a>
		</li>
	);
};

export default SearchResultsItem;
