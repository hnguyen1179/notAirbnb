import { ReactComponent as StarSvg } from "../../assets/icons/filled-star.svg";
import { ReviewsByListingIdQuery } from "../../generated/graphql";
import ListingReviewsItem from "./ListingReviewsItem";

interface IAverageScores {
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
	return <div className="ListingReviewsDesktop">i am desktop reviews</div>;
};

export default ListingReviewsDesktop;
