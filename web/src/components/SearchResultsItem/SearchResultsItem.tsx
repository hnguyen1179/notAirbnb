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
	const {
		region,
		reviewsCount,
		averageScore,
		id,
		superhost,
		listingType,
		city,
		title,
		price,
		cleaningFee,
		
	} = listing;

	const url = `images/${region
		.replaceAll(" ", "_")
		.toLowerCase()}/${id}/image-0`;

	const renderReviewScore = () => {
		if (!reviewsCount) {
			return "No reviews";
		} else if (reviewsCount && !averageScore) {
			return "No scores";
		} else {
			return averageScore;
		}
	};

	return (
		<li className="SearchResultsItem">
			<a href={`/listing/${id}`}>
				<div className="SearchResultsItem-container">
					<div className="SearchResultsItem__image">
						{superhost && (
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
					<div className="SearchResultsItem__details">
						{mobile ? "" : ""}
						<div className="score">
							<StarSvg />
							<span>{renderReviewScore()}</span>
							<span>({reviewsCount})</span>
						</div>
						<div className="type">
							<span>{listingType}</span>
							<span> · </span>
							<span>{city}</span>
						</div>
						<div className="title">
							<span>{title}</span>
						</div>
						<div className="price">
							<span>${numberWithCommas(price)}</span>
							<span> / </span>
							<span>night</span>
							<div className="total-price">
								{checkIn < new Date()
									? ""
									: calculateTotalArgs({
											checkIn,
											checkOut,
											pricePerNight: price,
											cleaningFee: cleaningFee,
											region: region,
									  }).totalPrice + " total"}
							</div>
						</div>
					</div>
				</div>
			</a>
		</li>
	);
};

export default SearchResultsItem;
