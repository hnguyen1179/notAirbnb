import React from "react";
import { format, getDay } from "date-fns";
import { Redirect } from "react-router";
import Loading from "../components/Loading";
import { useReservationByIdQuery } from "../generated/graphql";
import { week } from "../constants/weekdays";
import { ReactComponent as RightSvg } from "../assets/icons/right-arrow.svg";
import { ReactComponent as MapSvg } from "../assets/icons/map.svg";
import { ReactComponent as MobileSvg } from "../assets/icons/mobile.svg";
import { ReactComponent as FilledSpeechSvg } from "../assets/icons/filled-speech.svg";

interface Props {
	id: string;
	renderProps: any;
}

const TripPage = ({ id, renderProps }: Props) => {
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

	const { listing, dateStart, dateEnd } = data.reservationById;
	const { host, city, title, houseRules, address } = listing;

	const start = format(new Date(dateStart), "MMM d");
	const end = format(new Date(dateEnd), "MMM d");
	const year = format(new Date(dateStart), "yyyy");

	console.log(houseRules);

	const checkInTime = houseRules[0]?.split(": ")[1];
	const checkOutTime = houseRules[1]?.includes("Checkout")
		? houseRules[1]?.split(": ")[1]
		: "11:00 AM";

	const checkInDay = week[getDay(new Date(dateStart))];
	const checkOutDay = week[getDay(new Date(dateEnd))];

	const addressModded = address.replaceAll(",", "").replaceAll(" ", "%20");
	const googleAPI = "https://www.google.com/maps/search/?api=1&query=";

	const googleMapLink = googleAPI + addressModded;

	return (
		<div className="TripPage">
			<div className="TripPage-container">
				<header className="TripPage__header">
					<span>
						{city} · {start} - {end}, {year}
					</span>
					<h1>Your stay at {host?.firstName}'s place</h1>
				</header>

				<div className="divider" />

				<div className="TripPage__carousel"></div>

				<div className="TripPage__listing-title">
					<h2>{title}</h2>
				</div>

				{/* <div className="divider" /> */}

				<div className="TripPage__logistics">
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
				</div>

				<div className="TripPage__contact">
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
						<a>
							<MobileSvg />
							<span>Call host</span>
							<RightSvg />
						</a>
					</button>
					<button>
						<a>
							<FilledSpeechSvg />
							<span>Message host</span>
							<RightSvg />
						</a>
					</button>
        </div>
        
        <div className="big-divider" />
        
        <div className="TripPage__details">

        </div>
			</div>
		</div>
	);
};

export default TripPage;
