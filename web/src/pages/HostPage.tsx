import { useContext } from "react";
import { AppContext } from "../context/AppContext";

import Navbar from "../components/Navbar/Navbar";
import { useFetchHostReviews } from "../hooks/useFetchHostReviews";
import { Review, useHostByIdQuery } from "../generated/graphql";
import Loading from "../components/Loading";
import ReviewItem from "../components/ReviewItem/ReviewItem";
import Profile, { ITypeProps } from "../components/Profile/Profile";

interface Props {
	id: string;
	renderProps: any;
}

const HostPage = ({ id, renderProps }: Props) => {
	const { cloudinary, mobile } = useContext(AppContext);
	const { loading, error, data } = useHostByIdQuery({ variables: { id } });

	const {
		error: reviewsError,
		data: reviewsData,
		handleFetchMore,
		fetchLoading,
	} = useFetchHostReviews(id);

	if (loading)
		return (
			<div className="page-loading">
				<Loading />
			</div>
		);

	if (error || reviewsError)
		return (
			<div>
				{error}
				{reviewsError}
			</div>
		);

	if (data?.hostById == null || reviewsData?.reviewsByHostId == null) {
		return (
			<div className="page-loading">
				<Loading />
			</div>
		);
	}

	//create reviesCount

	const reviews = reviewsData.reviewsByHostId;
	const { firstName, dateJoined } = data?.hostById;

	console.log(reviews);

	const renderReviewItems = () => {
		return reviews.map((review) => {
			return (
				<ReviewItem
					id={review.authorId || ""}
					review={review as Review}
					firstName={review.author?.firstName || ""}
					dateJoined={review.author?.dateJoined || ""}
					type={"host"}
				/>
			);
		});
	};

	const typeProps: ITypeProps = {
		id,
		type: "host",
		firstName,
		dateJoined,
		reviewsCount: reviews.length,
		fetchLoading,
		handleFetchMore,
		reviews: reviews as Review[],
		renderReviewItems,
	};

	return <Profile typeProps={typeProps} renderProps={renderProps} />;
};

export default HostPage;
