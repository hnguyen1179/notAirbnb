import { useContext } from "react";
import { AdvancedImage } from "@cloudinary/react";

import { AppContext } from "../../context/AppContext";
import Navbar from "../Navbar/Navbar";

import { ReactComponent as FilledStarSvg } from "../assets/icons/filled-star.svg";
import { ReactComponent as ShieldSvg } from "../assets/icons/shield.svg";
import { ReactComponent as StarSvg } from "../assets/icons/star.svg";
import ReviewItem from "../ReviewItem/ReviewItem";
import Loading from "../Loading";
import MobileNavbar from "../MobileNavbar/MobileNavbar";
import Footer from "../Footer/Footer";
import useLogout from "../../hooks/useLogout";
import { Review } from "../../generated/graphql";

interface Props {
	id: string; // this will either be userId or hostId
	type: "host" | "user";
	renderProps: any;
}

const Profile = (props: Props) => {
	const { cloudinary, mobile, user: currentUser } = useContext(AppContext);
	const logout = useLogout();

	const handleLogout = async () => {
		await logout();
		props.renderProps.history.push("/");
	};

	// firstName
	// dateJoined
	// reviewsCount
	// fetchLoading
	// handleFetchMore
	// reviews

	const renderPronoun = () => {
		if (props.type === "host") {
			return firstName;
		} else if (props.type === "user") {
			return currentUser && currentUser.id === props.id
				? "Your"
				: "Their";
		}
	};

	return (
		<div className="UserPage">
			{!mobile && (
				<>
					<Navbar notLanding={true} />
					<div className="Navbar-filler"></div>
				</>
			)}

			<div className="UserPage-container UserPage-container--original">
				<header className="UserPage__header">
					<div className="UserPage__header__title">
						<h1>Hi, I'm {firstName}</h1>
						<span>{dateJoined}</span>
					</div>
					<div className="UserPage__header__avatar">
						<AdvancedImage
							className="avatar"
							cldImg={cloudinary.image(
								`${props.type}_avatars/${props.id}`
							)}
						/>
					</div>
				</header>

				<div className="UserPage__badges">
					<div>
						<StarSvg />
						<span>{reviewsCount} reviews</span>
					</div>
					<div>
						<ShieldSvg />
						<span>Identity Verified</span>
					</div>
				</div>

				<div className="UserPage-divider" />

				<div className="UserPage__reviews">
					<div className="UserPage__reviews__title">
						<FilledStarSvg />
						<h2>{renderPronoun()} reviews</h2>
					</div>
					<ul className="UserPage__reviews__content">
						{reviews.map((review: Review) => {
							return (
								<ReviewItem review={review} type={props.type} key={review.id} />
							);
						})}
					</ul>
					{reviews.length !== reviewsCount &&
						(fetchLoading ? (
							<button
								className={`UserPage__reviews__more-button ${
									fetchLoading ? "loading" : ""
								}`}
								onClick={handleFetchMore}
							>
								<Loading />
							</button>
						) : (
							<button
								className="UserPage__reviews__more-button"
								onClick={handleFetchMore}
							>
								<div>Show more reviews</div>
							</button>
						))}
				</div>

				{mobile && <div className="UserPage-divider" />}

				{currentUser && mobile && (
					<footer className="UserPage__footer">
						<button
							className="UserPage__footer__logout-button"
							onClick={handleLogout}
						>
							Log out
						</button>
					</footer>
				)}
			</div>

			<div className="UserPage-container UserPage-container--revised">
				<div className="UserPage__badges">
					<div className="UserPage__header__avatar">
						<AdvancedImage
							className="avatar"
							cldImg={cloudinary.image(
								`${props.type}_avatars/${props.id}`
							)}
						/>
					</div>
					<div>
						<StarSvg />
						<span>{reviewsCount} reviews</span>
					</div>
					<div>
						<ShieldSvg />
						<span>Identity Verified</span>
					</div>
				</div>

				<div>
					<header className="UserPage__header">
						<div className="UserPage__header__title">
							<h1>Hi, I'm {firstName}</h1>
							<span>{dateJoined}</span>
						</div>
					</header>

					<div className="UserPage-divider" />

					<div className="UserPage__reviews">
						<div className="UserPage__reviews__title">
							<FilledStarSvg />
							<h2>{isUser ? "Your" : "Their"} reviews</h2>
						</div>
						<ul className="UserPage__reviews__content">
							{reviews.map((review: Review) => {
								return (
									<ReviewItem
										review={review}
										key={review.id}
									/>
								);
							})}
						</ul>
						{reviews.length !== reviewsCount &&
							(fetchLoading ? (
								<button
									className={`UserPage__reviews__more-button ${
										fetchLoading ? "loading" : ""
									}`}
									onClick={handleFetchMore}
								>
									<Loading />
								</button>
							) : (
								<button
									className="UserPage__reviews__more-button"
									onClick={handleFetchMore}
								>
									<div>Show more reviews</div>
								</button>
							))}
					</div>

					{mobile && <div className="UserPage-divider" />}

					{props.type === "user" && mobile && currentUser && (
						<footer className="UserPage__footer">
							<button
								className="UserPage__footer__logout-button"
								onClick={handleLogout}
							>
								Log out
							</button>
						</footer>
					)}
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

export default Profile;
