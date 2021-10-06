import { useState } from "react";
import { useAppState } from "../context/AppContext";
import MobileNavbar from "../components/MobileNavbar/MobileNavbar";
import { ReactComponent as TripsSvg } from "../assets/icons/trips.svg";
import { useReservationsByUserIdQuery } from "../generated/graphql";
import Loading from "../components/Loading";
import ReservationItem from "../components/ReservationItem/ReservationItem";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";

interface Props {
	id: string;
}

const TripsPage = ({ id }: Props) => {
	const [onUpcoming, setOnUpcoming] = useState(true);
	const { mobile } = useAppState();

	const { loading, error, data } = useReservationsByUserIdQuery({
		variables: { id },
	});

	if (loading)
		return (
			<div className="page-loading">
				{" "}
				<Loading />{" "}
			</div>
		);

	if (error || !data?.reservationsByUserId) return <div>{error}</div>;

	const handleSetActiveTab = (e: any) => {
		setOnUpcoming(!onUpcoming);
	};

	const [future, past] = data.reservationsByUserId;

	const renderFuture = (
		<ul className="TripsPage__content__list">
			{future.map((reservation, idx) => {
				return <ReservationItem key={idx} reservation={reservation} />;
			})}
		</ul>
	);

	const renderPast = (
		<ul className="TripsPage__content__list">
			{past.map((reservation, idx) => {
				return <ReservationItem key={idx} reservation={reservation} />;
			})}
		</ul>
	);

	return (
		<div className="TripsPage">
			{!mobile && (
				<>
					<Navbar notLanding={true} />
					<div className="Navbar-filler"></div>
				</>
			)}

			<div className="TripsPage-container">
				<header className="TripsPage__header">
					<h1>Trips</h1>
				</header>

				<div className="TripsPage__navigator">
					<button
						className={`TripsPage__navigator__tab ${
							onUpcoming ? "active" : ""
						}`}
						onClick={handleSetActiveTab}
					>
						Upcoming
					</button>

					<button
						className={`TripsPage__navigator__tab ${
							onUpcoming ? "" : "active"
						}`}
						onClick={handleSetActiveTab}
					>
						Past
					</button>
				</div>

				<div className="TripsPage__content">
					{onUpcoming ? renderFuture : renderPast}

					<div className="TripsPage__content__placeholder">
						<aside>
							When you’re ready to start planning your next trip,
							we’re here to help. <span>Learn more</span>
						</aside>
						<div>
							<TripsSvg />
						</div>
						<button>
							<Link to="/">
								<div>Explore Airbnb</div>
							</Link>
						</button>
						<div className="divider" />
						<aside>
							Can’t find your reservation here?{" "}
							<span>Visit the Help Center</span>.
						</aside>
					</div>
				</div>
			</div>

			{mobile ? (
				<MobileNavbar />
			) : (
				<div className="Footer-container">
					<Footer />
				</div>
			)}
		</div>
	);
};

export default TripsPage;
