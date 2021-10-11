import { FC, MouseEvent } from "react";
import { Redirect, RouteComponentProps, RouteProps } from "react-router";
import { AdvancedImage, placeholder } from "@cloudinary/react";

import {
	useListingByIdQuery,
	useReviewsByListingIdQuery,
} from "../generated/graphql";
import Loading from "../components/Loading";
import { useAppState } from "../context/AppContext";
import Navbar from "../components/Navbar/Navbar";

import ListingMobileNav from "../components/ListingMobileNav/ListingMobileNav";
import PictureCarousel from "../components/SearchResultsItem/PictureCarousel";
import ListingCarousel from "../components/ListingCarousel/ListingCarousel";
import ListingTitle from "../components/ListingBasics/ListingTitle";
import ListingDetails from "../components/ListingBasics/ListingDetails";
import ListingHighlights from "../components/ListingHighlights/ListingHighlights";
import ListingListingDescription from "../components/ListingListingDescription/ListingListingDescription";
import ListingAmenities from "../components/ListingAmenities/ListingAmenities";
import ListingMap from "../components/ListingMap/ListingMap";
import ListingReservation from "../components/ListingReservation/ListingReservation";
import Footer from "../components/Footer/Footer";
import ListingReviewsMobile from "../components/ListingReviews/ListingReviewsMobile";
import ListingReviewsDesktop from "../components/ListingReviews/ListingReviewsDesktop";
import ListingHost from "../components/ListingHost/ListingHost";
import ListingRules from "../components/ListingRules.tsx/ListingRules";
import ListingImagesGrid from "../components/ListingImagesGrid/ListingImagesGrid";

interface Props extends RouteComponentProps {
	id: string;
}

const ListingPage: FC<Props> = (props) => {
	const { id, history } = props;
	const { cloudinary, mobile } = useAppState();

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

	if (!listingData || !listingData.listingById || !reviewsData) {
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

	const { listingById } = listingData;

	return (
		<div className="ListingPage">
			<div className="ListingPage__nav">
				{mobile ? (
					<ListingMobileNav handleBack={handleBack} />
				) : (
					<>
						<Navbar notLanding />
						<div className="Navbar-filler" />
					</>
				)}
			</div>

			<div className="ListingPage__basics">
				<div className="ListingPage__basics__pictures">
					{mobile ? (
						<ListingCarousel
							cloudinary={cloudinary}
							id={id}
							region={listingById.region}
							imageComments={listingById.imageComments}
						/>
					) : (
						<ListingImagesGrid />
					)}
				</div>
				<section className="ListingPage__basics__title">
					<ListingTitle
						title={listingById.title}
						averageScore={listingById.averageScore}
						reviewsCount={listingById.reviewsCount}
						city={listingById.city}
						state={listingById.state}
						superhost={listingById.superhost}
					/>
				</section>
			</div>

			<main className="ListingPage__content">
				<div className="content-top">
					<div className="content-top-left">
						<section className="ListingPage__content__details">
							<ListingDetails
								cloudinary={cloudinary}
								listingType={listingById.listingType}
								hostName={listingById.host?.firstName || ""}
								hostId={listingById.host?.id || ""}
								numGuests={listingById.numGuests}
								numBedrooms={listingById.numBedrooms}
								numBeds={listingById.numBeds}
								numBaths={listingById.numBaths}
							/>
						</section>

						<section className="ListingPage__content__highlights">
							<ListingHighlights
								highlights={listingById.highlights}
							/>
						</section>

						<section className="ListingPage__content__listing-description">
							<ListingListingDescription
								listingDescription={
									listingById?.listingDescription
								}
							/>
						</section>

						<section className="ListingPage__content__amenities">
							<ListingAmenities
								amenities={listingById.amenities}
							/>
						</section>

						{/* Render this conditionally based on mobile */}
						{mobile && (
							<section className="ListingPage__content__map">
								<ListingMap
									city={listingById.city}
									state={listingById.state}
									address={listingById.address}
									locationDescription={
										listingById.locationDescription
									}
								/>
							</section>
						)}

						<section className="ListingPage__content__reservation">
							<ListingReservation
								city={listingById.city}
								datesUnavailable={listingById.datesUnavailable}
							/>
						</section>

						{/* Render this conditionally based on mobile */}
						{mobile && (
							<>
								<section className="ListingPage__content__reviews">
									<ListingReviewsMobile
										averageScore={listingById.averageScore}
										reviewsCount={listingById.reviewsCount}
										reviews={reviewsData}
									/>
								</section>

								<section className="ListingPage__content__host">
									<ListingHost host={listingById.host} />
								</section>

								<section className="ListingPage__content__rules">
									<ListingRules
										houseRules={listingById.houseRules}
										healthAndSafety={
											listingById.healthAndSafety
										}
									/>
								</section>
							</>
						)}
					</div>

					<div className="content-top-right">
						<div
							className="ListingPage__content__reservation-box"
							aria-hidden={mobile}
						></div>
					</div>
				</div>

				{/**
				 * TODO:
				 *
				 * 1. Make ListingPage desktop version responsive
				 * 		- Create ListingReviewsDesktop
				 * 		- Make rules, host, and map responsive
				 *
				 * 2. Finish functionality of ListingPage
				 * 		- Reserve functionality
				 * 		- Create Reviews functionality
				 *
				 * 3. Deploy and add to Resume!
				 * 		- Fix major bugs; logging in bug. etc
				 *
				 *
				 */}

				<div className="content-bottom">
					{!mobile && (
						<section className="ListingPage__content__reviews">
							<ListingReviewsDesktop
								averageScore={listingById.averageScore}
								averageScores={listingById.averageScores}
								reviewsCount={listingById.reviewsCount}
								reviews={reviewsData}
							/>
						</section>
					)}

					{!mobile && (
						<section className="ListingPage__content__map">
							<ListingMap
								city={listingById.city}
								state={listingById.state}
								address={listingById.address}
								locationDescription={
									listingById.locationDescription
								}
							/>
						</section>
					)}
				</div>
			</main>

			<div className="ListingPage__footer">
				<div className="Footer-container">
					<Footer />
				</div>
			</div>
		</div>
	);
};

export default ListingPage;
