import { Cloudinary } from "@cloudinary/base";

import { useFetchHostReviews } from "../hooks/useFetchHostReviews";
import { Listing, Review, useHostByIdQuery } from "../generated/graphql";
import Loading from "../components/Loading";
import ReviewItem from "../components/ReviewItem/ReviewItem";
import Profile, { ITypeProps, IHostProps } from "../components/Profile/Profile";
import { ReactComponent as SuperhostSvg } from "../assets/icons/superhost.svg";
import ListingPreview from "../components/Profile/ListingPreview";

interface Props {
	id: string;
	routeProps: any;
}

const RenderReviewItems = (props: {
	reviews: Review[];
	cloudinary: Cloudinary;
}) => {
	return (
		<>
			{props.reviews.map((review: Review) => {
				return (
					<ReviewItem
						key={review.authorId}
						id={review.authorId || ""}
						review={review}
						firstName={review.author?.firstName || ""}
						dateJoined={review.author?.dateJoined || ""}
						type={"host"}
						cloudinary={props.cloudinary}
					/>
				);
			})}
		</>
	);
};

const RenderSuperhost = (props: { medals: string[] }) => {
	if (props.medals.includes("Superhost")) {
		return (
			<div className="badge">
				<SuperhostSvg />
				<span>Superhost</span>
			</div>
		);
	} else {
		return <></>;
	}
};

const RenderDescription = (props: { description: string }) => {
	return (
		<>
			<div className="UserPage-divider" />

			<div className="UserPage__about">
				<div>
					<h2>About</h2>
				</div>

				<p>{props.description}</p>
			</div>
		</>
	);
};

const RenderListings = (props: {
	cloudinary: Cloudinary;
	listings: Listing[];
	firstName: string;
}) => {
	return (
		<>
			<div className="UserPage-divider" />

			<div className="UserPage__listings">
				<div>
					<h2>{props.firstName}'s Listings</h2>
				</div>

				{/* Layout of this would be a flexbox in desktop; and a 2x2 grid in desktop  */}
				<ul className="UserPage__listings__list">
					{props.listings.map((listing) => {
						const url = `images/${listing?.region
							.replaceAll(" ", "_")
							.toLowerCase()}/${listing?.id}/image-0`;

						return (
							<ListingPreview
								url={url}
								cloudinary={props.cloudinary}
								listing={listing}
							/>
						);
					})}
				</ul>
			</div>
		</>
	);
};

const HostPage = ({ id, routeProps }: Props) => {
	const { loading, error, data } = useHostByIdQuery({ variables: { id } });

	const {
		error: reviewsError,
		data: reviewsData,
		handleFetchMore,
		fetchLoading,
	} = useFetchHostReviews(id);

	if (
		loading ||
		data?.hostById == null ||
		reviewsData?.reviewsByHostId == null
	)
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

	const reviews = reviewsData.reviewsByHostId;
	const { firstName, dateJoined, listings, description, medals } =
		data?.hostById;
	const reviewsCount =
		listings
			.map((listing) => listing?.reviewsCount)
			.reduce((acc, cv) => {
				return (acc as number) + (cv as number);
			}, 0) || 0;

	const typeProps: ITypeProps = {
		id,
		type: "host",
		firstName,
		dateJoined,
		reviewsCount,
		fetchLoading,
		handleFetchMore,
		reviews: reviews as Review[],
		RenderReviewItems,
	};

	const hostProps: IHostProps = {
		RenderSuperhost,
		RenderDescription,
		RenderListings,
		medals: medals as string[],
		description: description as string,
		listings: listings as Listing[],
	};
	
	return (
		<Profile
			typeProps={typeProps}
			hostProps={hostProps}
			routeProps={routeProps}
		/>
	);
};

export default HostPage;
