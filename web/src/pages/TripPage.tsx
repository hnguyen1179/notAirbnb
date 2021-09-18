import { useState, useContext } from "react";
import { format, getDay } from "date-fns";
import { Redirect } from "react-router";
import { debounce } from "@material-ui/core";
import { AdvancedImage } from "@cloudinary/react";
import GoogleMapReact from "google-map-react";

import Loading from "../components/Loading";
import { Reservation, useReservationByIdQuery } from "../generated/graphql";
import { week } from "../constants/weekdays";
import { ReactComponent as RightSvg } from "../assets/icons/right-arrow.svg";
import { ReactComponent as MapSvg } from "../assets/icons/map.svg";
import { ReactComponent as MobileSvg } from "../assets/icons/mobile.svg";
import { ReactComponent as FilledSpeechSvg } from "../assets/icons/filled-speech.svg";
import { ReactComponent as CopySvg } from "../assets/icons/copy.svg";
import { ReactComponent as DoorSvg } from "../assets/icons/door.svg";
import { ReactComponent as HospitalSvg } from "../assets/icons/hospital.svg";
import { ReactComponent as QuestionSvg } from "../assets/icons/question.svg";
import { ReactComponent as BoldNegativeSvg } from "../assets/icons/bold-negative.svg";
import { calculateTotal } from "../utils/priceBreakdown";
import { copyToClipboard } from "../utils/copyToClipboard";
import { AppContext } from "../context/AppContext";
import { coordinates } from "../constants/coordinates";
import HouseMarker from "../components/HouseMarker/HouseMarker";
import { style } from "../constants/simpleMapStyle";

interface Props {
	id: string;
	renderProps: any;
}

const TripPage = ({ id, renderProps }: Props) => {
	const { cloudinary } = useContext(AppContext);
	const [copied, setCopied] = useState(false);

	const { loading, error, data } = useReservationByIdQuery({
		variables: { id },
	});

	if (error) {
		return <Redirect to="/404" />;
	}

	if (
		loading ||
		data?.reservationById == null ||
		data?.reservationById?.listing == null
	)
		return (
			<div className="page-loading">
				<Loading />
			</div>
		);

	const { listing, dateStart, dateEnd, listingId } = data.reservationById;
	const { host, city, title, houseRules, address, region, imageComments } =
		listing;

	const start = format(new Date(dateStart), "MMM d");
	const end = format(new Date(dateEnd), "MMM d");
	const year = format(new Date(dateStart), "yyyy");

	const checkInTime = houseRules[0]?.split(": ")[1];
	const checkOutTime = houseRules[1]?.includes("Checkout")
		? houseRules[1]?.split(": ")[1]
		: "11:00 AM";

	const checkInDay = week[getDay(new Date(dateStart))];
	const checkOutDay = week[getDay(new Date(dateEnd))];

	const addressModded = address.replaceAll(",", "").replaceAll(" ", "%20");
	const googleAPI = "https://www.google.com/maps/search/?api=1&query=";

	const googleMapLink = googleAPI + addressModded;

	const total = calculateTotal(data.reservationById as Reservation);

	const handleBackClick = () => {
		renderProps.history.goBack();
	};

	const handleCopyAddress = debounce(() => {
		copyToClipboard(listing.address);
		setCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 500);
	}, 200);

	const createMapOptions = () => ({
		gestureHandling: "none",
		zoomControl: false,
		fullscreenControl: false,
		styles: style,
	});

	const mapOptions = {
		zoom: 15,
		center: coordinates[address],
	};

	return (
		<div className="TripPage">
			<div className="TripPage-back-button">
				<button onClick={handleBackClick}>
					<BoldNegativeSvg />
				</button>
				<div>Your home reservation</div>
				<div></div>
			</div>
			<div className="TripPage-back-button-filler" />

			<div className="TripPage-container">
				<header className="TripPage__header">
					<span>
						{city} · {start} - {end}, {year}
					</span>
					<h1>Your stay at {host?.firstName}'s place</h1>
				</header>

				<div className="divider" />

				<section className="TripPage__carousel">
					<div className="TripPage__carousel__image">
						<span className="image-count">
							1/{imageComments.length}
						</span>
						<a href={`/listing/${listingId}`}>
							<AdvancedImage
								cldImg={cloudinary.image(
									`images/${region
										.toLocaleLowerCase()
										.replace(
											" ",
											"_"
										)}/${listingId}/image-0`
								)}
							/>
						</a>
					</div>
					<div>
						<a href={`/listing/${listingId}`}>
							<h2>{title}</h2>
						</a>
					</div>
				</section>

				<section className="TripPage__logistics">
					<div className="TripPage__logistics__panel">
						<div className="check-time">Check-in</div>
						<div>
							{checkInDay}, {start}, {year}
						</div>
						<div>{checkInTime}</div>
					</div>
					<div className="TripPage__logistics__panel">
						<div className="check-time">Checkout</div>
						<div>
							{checkOutDay}, {end}, {year}
						</div>
						<div>{checkOutTime}</div>
					</div>
				</section>

				<section className="TripPage__contact">
					<button className="active">
						<a
							href={googleMapLink}
							target="_blank"
							rel="noreferrer"
						>
							<MapSvg />
							<span>Get directions</span>
							<RightSvg />
						</a>
					</button>
					<button>
						<div>
							<MobileSvg />
							<span>Call host</span>
							<RightSvg />
						</div>
					</button>
					<button>
						<div>
							<FilledSpeechSvg />
							<span>Message host</span>
							<RightSvg />
						</div>
					</button>
				</section>

				<div className="big-divider" />

				<section className="TripPage__receipt">
					<div className="TripPage__receipt__title">
						<h2>Price breakdown</h2>
					</div>
					<div className="TripPage__receipt__breakdown">
						<div className="breakdown-line">
							<span>
								${listing.price?.toFixed(2)} x{" "}
								{total.totalNights} nights
							</span>
							<span>${total.price?.toFixed(2)}</span>
						</div>
						<div className="breakdown-line">
							<span>Cleaning fee</span>
							<span>${total.cleaningFee?.toFixed(2)}</span>
						</div>
						<div className="breakdown-line">
							<span>Service fee</span>
							<span>${total.serviceFee?.toFixed(2)}</span>
						</div>
						<div className="breakdown-line">
							<span>Occupancy fees and taxes</span>
							<span>${total.occupancyTax?.toFixed(2)}</span>
						</div>
						<div className="breakdown-line total">
							<span>Total (USD)</span>
							<span>${total.totalPrice?.toFixed(2)}</span>
						</div>
					</div>
				</section>

				<div className="big-divider" />

				<section className="TripPage__directions">
					<div className="TripPage__directions__title">
						<h2>Getting there</h2>
					</div>
					<div className="TripPage__directions__map">
						{/* GOOGLE MAP */}
						<GoogleMapReact
							bootstrapURLKeys={{
								key: process.env
									.REACT_APP_GOOGLE_API_KEY as string,
							}}
							defaultCenter={mapOptions.center}
							defaultZoom={mapOptions.zoom}
							options={createMapOptions}
						>
							<HouseMarker
								lat={mapOptions.center.lat}
								lng={mapOptions.center.lng}
							/>
						</GoogleMapReact>
					</div>
					<div className="TripPage__directions__address">
						<div>Address</div>
						<div>{listing.address.split(/, (.+)/)[0]}</div>
						<div>{listing.address.split(/, (.+)/)[1]}</div>
					</div>
					<div className="TripPage__directions__copy">
						<button className="active" onClick={handleCopyAddress}>
							<div>
								<CopySvg />
								<span>
									{copied ? "Copied" : "Copy directions"}
								</span>
								<RightSvg />
							</div>
						</button>
						<button className="active">
							<a
								href={googleMapLink}
								target="_blank"
								rel="noreferrer"
							>
								<MapSvg />
								<span>Get directions</span>
								<RightSvg />
							</a>
						</button>
						<button className="active">
							<a href={`/listing/${listingId}`}>
								<DoorSvg />
								<span>Show listing</span>
								<RightSvg />
							</a>
						</button>
					</div>
				</section>

				<div className="big-divider" />

				<section className="TripPage__host">
					<div className="TripPage__host__title">
						<div className="host-details">
							<h2>Your host, {host?.firstName}</h2>
							<span>
								<a href={`/host/${host?.id}`}>Show profile</a>
							</span>
						</div>
						<div className="host-image">
							<AdvancedImage
								cldImg={cloudinary.image(
									`host_avatars/${host?.id}`
								)}
							/>
						</div>
					</div>
				</section>

				<div className="big-divider" />

				<section className="TripPage__support">
					<div className="TripPage__support__title">
						<h2>Support</h2>
					</div>
					<div className="TripPage__support__help">
						<button>
							<div>
								<QuestionSvg />
								<span>Help Center</span>
								<RightSvg />
							</div>
						</button>
						<button>
							<div>
								<HospitalSvg />
								<span>Resolution Center</span>
								<RightSvg />
							</div>
						</button>
					</div>
				</section>
			</div>
		</div>
	);
};

export default TripPage;
