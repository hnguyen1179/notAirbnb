import { MouseEventHandler } from "react";
import { ReactComponent as StarSvg } from "../../assets/icons/filled-star.svg";
import { ReviewsByListingIdQuery } from "../../generated/graphql";
import AverageScores from "./AverageScores";
import ListingReviewsItem from "./ListingReviewsItem";

export interface IAverageScores {
	cleanliness: number;
	accuracy: number;
	communication: number;
	location: number;
	checkin: number;
	value: number;
}

interface Props {
	averageScore: number;
	averageScores: IAverageScores;
	reviewsCount: number;
	reviews: ReviewsByListingIdQuery;
	openPortal: MouseEventHandler<HTMLButtonElement>;
}

const ListingReviewsDesktop = (props: Props) => {
	const renderReviewScore = () => {
		if (!props.reviewsCount) {
			return "No reviews";
		} else if (props.reviewsCount && !props.averageScore) {
			return "No scores";
		} else {
			return props.averageScore;
		}
	};

	return (
		<div className="ListingReviewsDesktop">
			<div className="ListingReviewsDesktop__title">
				<StarSvg />
				<h2>
					{renderReviewScore()}
					<span className="spacer">·</span>
					{props.reviewsCount} reviews
				</h2>
			</div>

			<div className="ListingReviewsDesktop__average-scores">
				<AverageScores averageScores={props.averageScores} />
			</div>

			<div className="ListingReviewsDesktop__reviews">
				{props.reviews.reviewsByListingId
					.slice(0, 4)
					.map((review, idx) => {
						return (
							<ListingReviewsItem
								key={idx}
								review={review}
								openPortal={props.openPortal}
							/>
						);
					})}
			</div>

			{props.reviewsCount > 4 && (
				<button
					className="ListingReviewsDesktop__show-all show-all-button"
					onClick={props.openPortal}
				>
					<span>Show all {props.reviewsCount} reviews</span>
				</button>
			)}
		</div>
	);
};

export default ListingReviewsDesktop;
