import { Cloudinary } from "@cloudinary/base";
import ItemDetailsMobile from "./ItemDetailsMobile";
import ItemDetailsDesktop from "./ItemDetailsDesktop";
import { Maybe } from "../../generated/graphql";
import PictureCarousel from "./PictureCarousel";
import { AdvancedImage, placeholder, lazyload } from "@cloudinary/react";
export interface PartialListing {
	__typename?: "Listing" | undefined;
	id: string;
	address: string;
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
	const renderReviewScore = () => {
		if (!listing.reviewsCount) {
			return "No reviews";
		} else if (listing.reviewsCount && !listing.averageScore) {
			return "No scores";
		} else {
			return listing.averageScore;
		}
	};

	const url = `images/${listing.region.replaceAll(" ", "_").toLowerCase()}/${
		listing.id
	}/image-0`;

	return (
		<li className="SearchResultsItem">
			<a href={`/listing/${listing.id}`}></a>

			<div className="SearchResultsItem-container">
				<div className="SearchResultsItem__image">
					{listing.superhost && (
						<div className="superhost">
							<span>superhost</span>
						</div>
					)}
					{mobile ? (
						<AdvancedImage
							cldImg={cloudinary.image(url)}
							plugins={[
								placeholder("predominant-color"),
								lazyload(),
							]}
							alt={listing.imageComments[0]}
							draggable={false}
						/>
					) : (
						<PictureCarousel
							cloudinary={cloudinary}
							region={listing.region}
							id={listing.id}
							imageComments={listing.imageComments}
						/>
					)}
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
		</li>
	);
};

export default SearchResultsItem;
