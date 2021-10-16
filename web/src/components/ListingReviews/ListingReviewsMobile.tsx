import { MouseEventHandler } from "react";
import { ReactComponent as StarSvg } from "../../assets/icons/filled-star.svg";
import { ReviewsByListingIdQuery } from "../../generated/graphql";
import ListingReviewsItem from "./ListingReviewsItem";

interface Props {
	averageScore: number;
	reviewsCount: number;
	reviews: ReviewsByListingIdQuery;
	openPortal: MouseEventHandler<HTMLButtonElement>;
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
			</ul>

			{props.reviewsCount > 4 && (
				<button
					className="ListingReviewsMobile__show-all show-all-button"
					onClick={props.openPortal}
				>
					<span>Show all {props.reviewsCount} reviews</span>
				</button>
			)}
		</div>
	);
};

export default ListingReviewsMobile;
