import { useFetchHostReviews } from "../hooks/useFetchHostReviews";
import { Review, useHostByIdQuery } from "../generated/graphql";
import Loading from "../components/Loading";
import ReviewItem from "../components/ReviewItem/ReviewItem";
import Profile, { ITypeProps, IHostProps } from "../components/Profile/Profile";
import { ReactComponent as SuperhostSvg } from "../assets/icons/superhost.svg";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/base";

interface Props {
	id: string;
	renderProps: any;
}

const HostPage = ({ id, renderProps }: Props) => {
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

	const reviews = reviewsData.reviewsByHostId;
	const { firstName, dateJoined, listings, description, medals } =
		data?.hostById;
	const reviewsCount =
		listings
			.map((listing) => listing?.reviewsCount)
			.reduce((acc, cv) => {
				return (acc as number) + (cv as number);
			}, 0) || 0;

	const renderReviewItems = () => {
		return reviews.map((review) => {
			return (
				<ReviewItem
					key={review.authorId}
					id={review.authorId || ""}
					review={review as Review}
					firstName={review.author?.firstName || ""}
					dateJoined={review.author?.dateJoined || ""}
					type={"host"}
				/>
			);
		});
	};

	const renderSuperhost = () => {
		if (medals.includes("Superhost")) {
			return (
				<div className="badge">
					<SuperhostSvg />
					<span>Superhost</span>
				</div>
			);
		} else {
			return <div></div>;
		}
	};

	const renderDescription = () => {
		return (
			<>
				<div className="UserPage-divider" />

				<div className="UserPage__about">
					<div>
						<h2>About</h2>
					</div>

					<p>{description}</p>
				</div>
			</>
		);
	};

	const renderListings = (cloudinary: Cloudinary) => {
		return (
			<>
				<div className="UserPage-divider" />

				<div className="UserPage__listings">
					<div>
						<h2>{firstName}'s Listings</h2>
					</div>

					<ul>
						{listings.map((listing) => {
							const url = `images/${listing?.region
								.replaceAll(" ", "_")
								.toLowerCase()}/${listing?.id}/image-0`;

							return (
								<li>
									<AdvancedImage
										style={{ width: "100px" }}
										cldImg={cloudinary.image(url)}
									/>
									{listing?.reviewsCount}
									<div>{listing?.score}</div>
									{listing?.title}
								</li>
							);
						})}
					</ul>
				</div>
			</>
		);
	};

	const typeProps: ITypeProps = {
		id,
		type: "host",
		firstName,
		dateJoined,
		reviewsCount,
		fetchLoading,
		handleFetchMore,
		reviews: reviews as Review[],
		renderReviewItems,
	};

	const hostProps: IHostProps = {
		renderSuperhost,
		renderDescription,
		renderListings,
	};

	console.log(data);

	return (
		<Profile
			typeProps={typeProps}
			hostProps={hostProps}
			renderProps={renderProps}
		/>
	);
};

export default HostPage;
