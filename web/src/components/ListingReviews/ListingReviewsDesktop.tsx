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
}

const ListingReviewsDesktop = (props: Props) => {
	return (
		<div className="ListingReviewsDesktop">
			<div className="ListingReviewsDesktop__title">
				<StarSvg />
				<h2>
					{props.averageScore}
					<span className="spacer">·</span>
					{props.reviewsCount} reviews
				</h2>
			</div>

			<div className="ListingReviewsDesktop__average-scores">
				<AverageScores averageScores={props.averageScores} />
			</div>

			<div className="ListingReviewsDesktop__reviews">
				{props.reviews.reviewsByListingId.map((review, idx) => {
					return <ListingReviewsItem key={idx} review={review} />;
				})}
			</div>

			{props.reviewsCount > 4 && (
				<button className="ListingReviewsDesktop__show-all show-all-button">
					<span>Show all {props.reviewsCount} reviews</span>
				</button>
			)}
		</div>
	);
};

export default ListingReviewsDesktop;
