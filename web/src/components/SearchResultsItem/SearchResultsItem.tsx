import { Cloudinary } from "@cloudinary/base";
import ItemDetailsMobile from "./ItemDetailsMobile";
import ItemDetailsDesktop from "./ItemDetailsDesktop";
import { Maybe } from "../../generated/graphql";
import PictureCarousel from "./PictureCarousel";
import { useRef } from "react";
import ListingCarousel from "../ListingCarousel/ListingCarousel";
import { Link } from "react-router-dom";
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
	const imageRef = useRef<HTMLDivElement>(null);

	return (
		<li className="SearchResultsItem">
			<Link to={`/listing/${listing.id}`} />

			<div className="SearchResultsItem-container">
				<div className="SearchResultsItem__image" ref={imageRef}>
					{listing.superhost && (
						<div className="superhost">
							<span>superhost</span>
						</div>
					)}
					{mobile ? (
						<ListingCarousel
							cloudinary={cloudinary}
							imageComments={listing.imageComments}
							region={listing.region}
							id={listing.id}
						/>
					) : (
						<PictureCarousel
							cloudinary={cloudinary}
							region={listing.region}
							id={listing.id}
							imageComments={listing.imageComments}
							width={300}
						/>
					)}
				</div>
				{mobile ? (
					<ItemDetailsMobile
						listing={listing}
						checkIn={checkIn}
						checkOut={checkOut}
					/>
				) : (
					<ItemDetailsDesktop
						listing={listing}
						checkIn={checkIn}
						checkOut={checkOut}
					/>
				)}
			</div>
		</li>
	);
};

export default SearchResultsItem;
