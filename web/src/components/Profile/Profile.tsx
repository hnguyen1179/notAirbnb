import { useContext } from "react";
import { AdvancedImage } from "@cloudinary/react";

import { AppContext } from "../../context/AppContext";
import Navbar from "../Navbar/Navbar";

import { ReactComponent as ShieldSvg } from "../../assets/icons/shield.svg";
import { ReactComponent as StarSvg } from "../../assets/icons/star.svg";

import Loading from "../Loading";
import MobileNavbar from "../MobileNavbar/MobileNavbar";
import Footer from "../Footer/Footer";
import useLogout from "../../hooks/useLogout";
import { Review } from "../../generated/graphql";
import { Cloudinary } from "@cloudinary/base";

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

export interface IHostProps {
	renderSuperhost: () => JSX.Element;
	renderDescription: () => JSX.Element;
	renderListings: (cld: Cloudinary) => JSX.Element;
}
interface Props {
	typeProps: ITypeProps;
	renderProps: any;
	hostProps?: IHostProps;
}

const Profile = ({ typeProps, renderProps, hostProps }: Props) => {
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
			return `Guest's reviews`;
		} else {
			return currentUser && currentUser.id === id
				? "Your Reviews"
				: "Their Reviews";
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
					{type === "host" &&
						hostProps &&
						hostProps.renderSuperhost()}
					<div className="badge">
						<StarSvg />
						<span>{reviewsCount} reviews</span>
					</div>
					<div className="badge">
						<ShieldSvg />
						<span>Identity Verified</span>
					</div>
				</div>

				{type === "host" && hostProps && hostProps.renderDescription()}
				{type === "host" &&
					hostProps &&
					hostProps.renderListings(cloudinary)}
				<div className="UserPage-divider" />

				<div className="UserPage__reviews">
					<div className="UserPage__reviews__title">
						<h2>{renderPronoun()}</h2>
					</div>
					<ul className="UserPage__reviews__content">
						{renderReviewItems()}
					</ul>
					{reviews.length !== reviewsCount &&
						(fetchLoading ? (
							<button
								className="UserPage__reviews__more-button"
								role="alert"
								aria-busy={fetchLoading}
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

				{type === "user" && currentUser && mobile && (
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

					{type === "host" &&
						hostProps &&
						hostProps.renderSuperhost()}
					<div className="badge">
						<StarSvg />
						<span>{reviewsCount} reviews</span>
					</div>
					<div className="badge">
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

					{type === "host" &&
						hostProps &&
						hostProps.renderDescription()}
					{type === "host" &&
						hostProps &&
						hostProps.renderListings(cloudinary)}

					<div className="UserPage-divider" />

					<div className="UserPage__reviews">
						<div className="UserPage__reviews__title">
							<h2>{renderPronoun()}</h2>
						</div>
						<ul className="UserPage__reviews__content">
							{renderReviewItems()}
						</ul>
						{reviews.length !== reviewsCount &&
							(fetchLoading ? (
								<button
									className="UserPage__reviews__more-button"
									role="alert"
									aria-busy={fetchLoading}
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
