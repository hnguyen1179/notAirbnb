import { ReactComponent as StarSvg } from "../../assets/icons/filled-star.svg";
import { ReviewsByListingIdQuery } from "../../generated/graphql";
import ListingReviewsItem from "./ListingReviewsItem";

interface Props {
	averageScore: number;
	reviewsCount: number;
	reviews: ReviewsByListingIdQuery;
}

const ListingReviewsDesktop = (props: Props) => {
	return <div className="ListingReviewsDesktop">i am desktop reviews</div>;
};

export default ListingReviewsDesktop;
