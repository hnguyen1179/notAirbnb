import { useContext } from "react";
import { AdvancedImage } from "@cloudinary/react";

import { AppContext } from "../../context/AppContext";
import Navbar from "../Navbar/Navbar";

import { ReactComponent as FilledStarSvg } from "../../assets/icons/filled-star.svg";
import { ReactComponent as ShieldSvg } from "../../assets/icons/shield.svg";
import { ReactComponent as StarSvg } from "../../assets/icons/star.svg";

import Loading from "../Loading";
import MobileNavbar from "../MobileNavbar/MobileNavbar";
import Footer from "../Footer/Footer";
import useLogout from "../../hooks/useLogout";
import { Review } from "../../generated/graphql";

interface Props {
	typeProps: ITypeProps;
	renderProps: any;
}
export interface ITypeProps {
	id: string;
	type: "host" | "user";
	firstName: string;
	dateJoined: string;
	reviewsCount: number;
	fetchLoading: boolean;
	handleFetchMore: () => void;
	reviews: Review[];
	renderReviewItems: () => JSX.Element[];
}

const Profile = ({ typeProps, renderProps }: Props) => {
	const { cloudinary, mobile, user: currentUser } = useContext(AppContext);
	const logout = useLogout();

	const handleLogout = async () => {
		await logout();
		renderProps.history.push("/");
	};

	const {
		id,
		type,
		firstName,
		dateJoined,
		reviewsCount,
		reviews,
		fetchLoading,
		handleFetchMore,
		renderReviewItems,
	} = typeProps;

	const renderPronoun = () => {
		if (type === "host") {
      return `${firstName}'s`;
		} else if (type === "user") {
			return currentUser && currentUser.id === id ? "Your" : "Their";
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
							cldImg={cloudinary.image(`${type}_avatars/${id}`)}
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
						{renderReviewItems()}
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
							cldImg={cloudinary.image(`${type}_avatars/${id}`)}
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
							<h2>{renderPronoun()} reviews</h2>
						</div>
						<ul className="UserPage__reviews__content">
							{renderReviewItems()}
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

					{type === "user" && mobile && currentUser && (
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
