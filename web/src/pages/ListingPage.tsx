import { FC, MouseEvent, useContext } from "react";
import { Redirect, RouteComponentProps, RouteProps } from "react-router";
import { AdvancedImage, placeholder } from "@cloudinary/react";

import {
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
import ListingHighlights from "../components/ListingHighlights/ListingHighlights";
import ListingListingDescription from "../components/ListingListingDescription/ListingListingDescription";
import ListingAmenities from "../components/ListingAmenities/ListingAmenities";
import ListingMap from "../components/ListingMap/ListingMap";
import ListingReservation from "../components/ListingReservation/ListingReservation";
import Footer from "../components/Footer/Footer";

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

	const { listingById } = listingData;

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
							region={listingById.region}
							imageComments={listingById.imageComments}
						/>
					) : (
						<div> insert desktop version here </div>
					)}
				</div>
				<section className="ListingPage__basics__title">
					<ListingTitle
						title={listingById.title}
						averageScore={listingById.averageScore}
						reviewsCount={listingById.reviewsCount}
						city={listingById.city}
						state={listingById.state}
					/>
				</section>
			</div>

			<main className="ListingPage__content">
				<div>
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
							listingDescription={listingById?.listingDescription}
						/>
					</section>

					<section className="ListingPage__content__amenities">
						<ListingAmenities amenities={listingById.amenities} />
					</section>

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

					<section className="ListingPage__content__reservation">
						<ListingReservation
							city={listingById.city}
							datesUnavailable={listingById.datesUnavailable}
						/>
					</section>

					<section style={{ margin: "100px" }}></section>
				</div>

				<div>
					<div
						className="ListingPage__content__reservation-box"
						aria-hidden={mobile}
					></div>
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
