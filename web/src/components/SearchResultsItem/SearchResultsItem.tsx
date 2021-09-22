import { Cloudinary } from "@cloudinary/base";
import { AdvancedImage } from "@cloudinary/react";
import { ReactComponent as StarSvg } from "../../assets/icons/filled-star.svg";
import React from "react";
import { calculateTotal } from "../../utils/priceBreakdown";

interface PartialListing {
	__typename?: "Listing" | undefined;
	id: string;
	title: string;
	listingType: string;
	city: string;
	region: string;
	datesUnavailable: any;
	price: number;
	superhost: boolean;
	averageScore: number;
	reviewsCount: number;
}

interface Props {
	listing: PartialListing;
	cloudinary: Cloudinary;
}

const SearchResultsItem = ({ listing, cloudinary }: Props) => {
	const url = `images/${listing.region.replaceAll(" ", "_").toLowerCase()}/${
		listing.id
	}/image-0`;

	return (
		<div className="SearchResultsItem">
			<div className="SearchResultsItem__image">
				<AdvancedImage cldImg={cloudinary.image(url)} />
			</div>
			<div className="SearchResultsItem__details">
				<div className="score">
					<StarSvg />
					<span>{listing.averageScore}</span>
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
          <span>${listing.price}</span>
          <span> / </span>
          <span>night</span>
          <div>{calculateTotal()}</div>
        </div>
			</div>
		</div>
	);
};

export default SearchResultsItem;
