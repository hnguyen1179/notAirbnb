import { Review, useUserByIdQuery } from "../generated/graphql";
import Loading from "../components/Loading";
import { useFetchUserReviews } from "../hooks/useFetchUserReviews";
import Profile, { ITypeProps } from "../components/Profile/Profile";
import ReviewItem from "../components/ReviewItem/ReviewItem";
import { Cloudinary } from "@cloudinary/base";

interface Props {
	id: string;
	routeProps: any;
}

const RenderReviewItems = (props: { reviews: Review[], cloudinary: Cloudinary }) => {
	return (
		<>
			{props.reviews.map((review) => {
				return (
					<ReviewItem
						key={review.listing?.host?.id}
						id={review.listing?.host?.id || ""}
						review={review}
						firstName={review.listing?.host?.firstName || ""}
						dateJoined={review.listing?.host?.dateJoined || ""}
						type={"user"}
						cloudinary={props.cloudinary}
					/>
				);
			})}
		</>
	);
};

const UserPage = ({ id, routeProps }: Props) => {	
	const {
		error: reviewsError,
		data: reviewsData,
		handleFetchMore,
		fetchLoading,
	} = useFetchUserReviews(id);

	const {
		loading: userLoading,
		error: userError,
		data: userData,
	} = useUserByIdQuery({
		variables: { id },
		
	});

	if (userLoading)
		return (
			<div className="page-loading">
				<Loading />
			</div>
		);

	if (userError || reviewsError)
		return (
			<div>
				{userError}
				{reviewsError}
			</div>
		);

	if (userData?.userById == null || reviewsData?.reviewsByUserId == null) {
		return (
			<div className="page-loading">
				<Loading />
			</div>
		);
	}

	const { firstName, dateJoined, reviewsCount } = userData?.userById;
	const reviews = reviewsData.reviewsByUserId;

	const typeProps: ITypeProps = {
		id,
		type: "user",
		firstName,
		dateJoined,
		reviewsCount,
		fetchLoading,
		handleFetchMore,
		reviews: reviews as Review[],
		RenderReviewItems,
	};

	return <Profile typeProps={typeProps} routeProps={routeProps} />;
};

export default UserPage;
