import { FC, MouseEvent, useContext } from "react";
import { Redirect, RouteComponentProps, RouteProps } from "react-router";
import { AdvancedImage, placeholder } from "@cloudinary/react";

import {
	ReviewsByListingIdQuery,
	useListingByIdQuery,
	useReviewsByListingIdQuery,
} from "../generated/graphql";
import Loading from "../components/Loading";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar/Navbar";
import ListingMobileNav from "../components/ListingMobileNav/ListingMobileNav";
import PictureCarousel from "../components/SearchResultsItem/PictureCarousel";
import ListingCarousel from "../components/ListingCarousel/ListingCarousel";
import ListingTitle from "../components/ListingBasics/ListingTitle";
import ListingDetails from "../components/ListingBasics/ListingDetails";

interface Props extends RouteComponentProps {
	id: string;
}

const ListingPage: FC<Props> = (props) => {
	const { id, history } = props;
	const { cloudinary, mobile } = useContext(AppContext);

	const {
		loading: listingLoading,
		error: listingError,
		data: listingData,
	} = useListingByIdQuery({
		variables: {
			id,
		},
	});

	const {
		loading: reviewsLoading,
		error: reviewsError,
		data: reviewsData,
		fetchMore,
	} = useReviewsByListingIdQuery({
		variables: {
			id,
		},
	});

	if (listingLoading || reviewsLoading)
		return (
			<div className="page-loading">
				<Loading />
			</div>
		);

	if (!listingData || !listingData.listingById) {
		return <Redirect to="/404" />;
	}

	if (listingError) console.log(JSON.stringify(listingError, null, 2));
	if (reviewsError) console.log(JSON.stringify(reviewsError, null, 2));

	if (listingError || reviewsError)
		return (
			<p>
				{listingError?.message}
				{reviewsError?.message}
			</p>
		);

	const handleBack = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		history.goBack();
	};

	const {
		region,
		imageComments,
		title,
		averageScore,
		reviewsCount,
		city,
		state,
		listingType,
		host,
		numGuests,
		numBedrooms,
		numBeds,
		numBaths,
	} = listingData.listingById;

	return (
		<div className="ListingPage">
			<div className="ListingPage__nav">
				{mobile ? (
					<ListingMobileNav handleBack={handleBack} />
				) : (
					<Navbar notLanding />
				)}
			</div>

			<div className="ListingPage__basics">
				<div className="ListingPage__basics__pictures">
					{mobile ? (
						<ListingCarousel
							cloudinary={cloudinary}
							id={id}
							region={region}
							imageComments={imageComments}
						/>
					) : (
						<div> insert desktop version here </div>
					)}
				</div>
				<div className="ListingPage__basics__title">
					<ListingTitle
						title={title}
						averageScore={averageScore}
						reviewsCount={reviewsCount}
						city={city}
						state={state}
					/>
				</div>
				<div className="ListingPage__basics__details">
					<ListingDetails
						cloudinary={cloudinary}
						listingType={listingType}
						hostName={host?.firstName || ""}
						hostId={host?.id || ""}
						numGuests={numGuests}
						numBedrooms={numBedrooms}
						numBeds={numBeds}
						numBaths={numBaths}
					/>
				</div>
			</div>
		</div>
	);
};

export default ListingPage;
