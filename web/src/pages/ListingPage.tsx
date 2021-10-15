import { FC, MouseEvent, useEffect, useState } from "react";
import { Redirect, RouteComponentProps } from "react-router";

import {
	useListingByIdQuery,
	useReviewsByListingIdQuery,
} from "../generated/graphql";
import Loading from "../components/Loading";
import { useAppState } from "../context/AppContext";
import Navbar from "../components/Navbar/Navbar";

import ListingMobileNav from "../components/ListingMobileNav/ListingMobileNav";
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
import ListingReservationBox from "../components/ListingReservationBox/ListingReservationBox";
import { CalendarLogicProvider } from "../context/CalendarLogicContext";
import { useURLParams } from "../context/URLParamsContext";
import { usePortal } from "../hooks/usePortal";
import ListingShowMore from "../components/ListingShowMore/ListingShowMore";
import ShowListingReviews from "../components/ListingReviews/ShowListingReviews";

interface Props extends RouteComponentProps {
	id: string;
}

export const showMoreStyle = {
	from: { opacity: 0, transform: "translateY(50vh)" },
	to: {
		opacity: 1,
		transform: "translateY(0vh)",
	},
};

const ListingPage: FC<Props> = (props) => {
	console.log("ListingPage rendered")
	const { id, history } = props;
	const { cloudinary, mobile } = useAppState();
	const {
		state: { dates, guests },
		searchHandlers: { handleDateChange },
	} = useURLParams();
	const {
		Portal: ReviewsPortal,
		portalProps: reviewsPortalProps,
		openPortal: openReviewsPortal,
		closePortal: closeReviewsPortal,
	} = usePortal();

	useEffect(() => {
		return () => {
			document.body.style.overflow = "unset";
		};
	}, []);

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
		fetchMore: fetchMoreReviews,
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

	if (listingError) console.log(JSON.stringify(listingError, null, 2));
	if (reviewsError) console.log(JSON.stringify(reviewsError, null, 2));

	if (listingError || reviewsError)
		return (
			<p>
				{listingError?.message}
				{reviewsError?.message}
			</p>
		);

	if (!listingData || !listingData.listingById || !reviewsData) {
		return <Redirect to="/404" />;
	}

	const handleBack = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		history.goBack();
	};

	const { listingById } = listingData;

	const configType = mobile ? "default" : "stiff";

	const renderReviewsPortal = () => (
		<ReviewsPortal
			{...reviewsPortalProps}
			style={showMoreStyle}
			configType={configType}
		>
			<ListingShowMore
				closePortal={closeReviewsPortal}
				className="ShowListingReviews"
			>
				{(containerRef) => {
					return (
						<ShowListingReviews
							reviews={reviewsData}
							averageScore={listingById.averageScore}
							reviewsCount={listingById.reviewsCount}
							fetchMore={fetchMoreReviews}
							containerRef={containerRef}
							openPortal={openReviewsPortal}
						/>
					);
				}}
			</ListingShowMore>
		</ReviewsPortal>
	);

	return (
		<CalendarLogicProvider
			dates={dates}
			handleDateChange={handleDateChange}
			datesUnavailable={listingById.datesUnavailable}
		>
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
							<ListingImagesGrid
								cloudinary={cloudinary}
								id={id}
								region={listingById.region}
								imageComments={listingById.imageComments}
							/>
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

							{listingById?.listingDescription ? (
								<section className="ListingPage__content__listing-description">
									<ListingListingDescription
										listingDescription={
											listingById.listingDescription
										}
										configType={configType}
									/>
								</section>
							) : null}

							<section className="ListingPage__content__amenities">
								<ListingAmenities
									amenities={listingById.amenities}
									configType={configType}
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
									datesUnavailable={
										listingById.datesUnavailable
									}
								/>
							</section>

							{/* Render this conditionally based on mobile */}
							{mobile && (
								<>
									{reviewsData.reviewsByListingId.length ? (
										<section className="ListingPage__content__reviews">
											<ListingReviewsMobile
												averageScore={
													listingById.averageScore
												}
												reviewsCount={
													listingById.reviewsCount
												}
												reviews={reviewsData}
												openPortal={openReviewsPortal}
											/>
										</section>
									) : null}

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

						<div className="content-top-right" aria-hidden={mobile}>
							{!mobile && (
								<div className="ListingPage__content__reservation-box">
									<ListingReservationBox
										city={listingById.city}
										price={listingById.price}
										cleaningFee={listingById.cleaningFee}
										region={listingById.region}
										numGuests={guests}
										maxGuests={listingById.numGuests}
										averageScore={listingById.averageScore}
										reviewsCount={listingById.reviewsCount}
										datesUnavailable={
											listingById.datesUnavailable
										}
									/>
								</div>
							)}
						</div>
					</div>

					{/**
					 * TODO:
					 *
					 * 1. Finish functionality of ListingPage
					 * 		- Reserve functionality
					 * 		- Create Reviews functionality
					 * 		- Fix usePortal Portal
					 * 				- Use Media Queries to make a mobile version; where it encompasses the entire screen
					 *
					 * 2. Deploy and add to Resume!
					 * 		- Fix major bugs; logging in bug. etc
					 *
					 *
					 */}

					{!mobile && (
						<div className="content-bottom">
							{reviewsData.reviewsByListingId.length ? (
								<section className="ListingPage__content__reviews">
									<ListingReviewsDesktop
										averageScore={listingById.averageScore}
										averageScores={
											listingById.averageScores
										}
										reviewsCount={listingById.reviewsCount}
										reviews={reviewsData}
										openPortal={openReviewsPortal}
									/>
								</section>
							) : null}

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
						</div>
					)}
				</main>

				{renderReviewsPortal()}

				<div className="ListingPage__footer">
					<div className="Footer-container">
						<Footer />
					</div>
				</div>
			</div>
		</CalendarLogicProvider>
	);
};

export default ListingPage;
