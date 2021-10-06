import { useAppState } from "../../context/AppContext";
import { Maybe } from "../../generated/graphql";

interface ReviewPartial {
	__typename?: "Review";
	id: string;
	date: any;
	content: string;
	listing?: Maybe<{
		__typename?: "Listing";
		id: string;
		title: string;
		region: string;
	}>;
	author?: Maybe<{
		__typename?: "User";
		id: string;
		firstName: string;
		dateJoined: string;
	}>;
}

interface Props {
	review: ReviewPartial;
}

const ListingReviewsItem = (props: Props) => {
  const { cloudinary } = useAppState();

  return <div className="ListingReviewsItem">
    {props.review.author?.firstName}

  </div>;
};

export default ListingReviewsItem;
