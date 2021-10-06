import { ReactComponent as StarSvg } from "../../assets/icons/filled-star.svg";
import {
	ReviewsByListingIdQuery,
} from "../../generated/graphql";
import ListingReviewsItem from "./ListingReviewsItem";

interface Props {
	averageScore: number;
	reviewsCount: number;
	reviews: ReviewsByListingIdQuery;
}

const ListingReviews = (props: Props) => {
  if (!props.reviews.reviewsByListingId.length) return <></>;
  
	return (
		<div className="ListingReviews">
			<div className="ListingReviews__title">
				<StarSvg />
				<h2>
					{props.averageScore}
					<span className="spacer">·</span>
					{props.reviewsCount} reviews
				</h2>
			</div>

			<ul className="ListingReviews__reviews-preview">
				{props.reviews.reviewsByListingId
					.slice(0, 3)
					.map((review, idx) => {
						return (
							<li key={idx} className="ListingReviews__reviews-preview__review">
                <ListingReviewsItem review={review} />
							</li>
						);
					})}
			</ul>
		</div>
	);
};

export default ListingReviews;
