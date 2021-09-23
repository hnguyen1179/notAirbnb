import { Cloudinary } from "@cloudinary/base";
import { AdvancedImage, placeholder, lazyload } from "@cloudinary/react";
import { ReactComponent as StarSvg } from "../../assets/icons/filled-star.svg";
import React from "react";
import { calculateTotalArgs } from "../../utils/priceBreakdown";
import { numberWithCommas } from "../../utils/numberWithCommas";

interface PartialListing {
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
}

interface Props {
	listing: PartialListing;
	cloudinary: Cloudinary;
	checkIn: Date;
	checkOut: Date;
}

const SearchResultsItem = ({
	listing,
	cloudinary,
	checkIn,
	checkOut,
}: Props) => {
	const url = `images/${listing.region.replaceAll(" ", "_").toLowerCase()}/${
		listing.id
	}/image-0`;

	return (
		<li className="SearchResultsItem">
			<a href={`/listing/${listing.id}`}>
				<div className="SearchResultsItem__image">
					{listing.superhost && (
						<div className="superhost">
							<span>superhost</span>
						</div>
					)}
					<AdvancedImage
						cldImg={cloudinary.image(url)}
						plugins={[placeholder("predominant-color"), lazyload()]}
					/>
				</div>
				<div className="SearchResultsItem__details">
					<div className="score">
						<StarSvg />
						<span>
							{listing.reviewsCount === 0
								? "No reviews"
								: listing.averageScore}
						</span>
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
			</a>
		</li>
	);
};

export default SearchResultsItem;
