import { ReactComponent as StarSvg } from "../../assets/icons/filled-star.svg";
import { ReviewsByListingIdQuery } from "../../generated/graphql";
import ListingReviewsItem from "./ListingReviewsItem";

interface Props {
	averageScore: number;
	reviewsCount: number;
	reviews: ReviewsByListingIdQuery;
}

const ListingReviewsMobile = (props: Props) => {
	if (!props.reviews.reviewsByListingId.length) return <></>;
	
	return (
		<div className="ListingReviewsMobile">
			<div className="ListingReviewsMobile__title">
				<StarSvg />
				<h2>
					{props.averageScore}
					<span className="spacer">·</span>
					{props.reviewsCount} reviews
				</h2>
			</div>

			<ul className="ListingReviewsMobile__reviews-preview">
				{props.reviews.reviewsByListingId.map((review, idx) => {
					return <ListingReviewsItem key={idx} review={review} />;
				})}
			</ul>

			{props.reviewsCount > 4 && (
				<button className="ListingReviewsMobile__show-all show-all-button">
					<span>Show all {props.reviewsCount} reviews</span>
				</button>
			)}
		</div>
	);
};

export default ListingReviewsMobile;
