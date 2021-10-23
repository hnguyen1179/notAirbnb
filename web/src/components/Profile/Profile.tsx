import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/base";

import { useAppState } from "../../context/AppContext";
import Navbar from "../Navbar/Navbar";
import Loading from "../Loading";
import MobileNavbar from "../MobileNavbar/MobileNavbar";
import Footer from "../Footer/Footer";
import useLogout from "../../hooks/useLogout";
import { Review, Listing } from "../../generated/graphql";
import { ReactComponent as ShieldSvg } from "../../assets/icons/shield.svg";
import { ReactComponent as StarSvg } from "../../assets/icons/star.svg";

export interface ITypeProps {
	id: string;
	type: "host" | "user";
	firstName: string;
	dateJoined: string;
	reviewsCount: number;
	fetchLoading: boolean;
	handleFetchMore: () => void;
	reviews: Review[];
	RenderReviewItems: (props: {
		reviews: Review[];
		cloudinary: Cloudinary;
	}) => JSX.Element;
}

export interface IHostProps {
	RenderSuperhost: (props: { medals: string[] }) => JSX.Element;
	RenderDescription: (props: { description: string }) => JSX.Element;
	RenderListings: (props: {
		cloudinary: Cloudinary;
		listings: Listing[];
		firstName: string;
	}) => JSX.Element;
	medals: string[];
	description: string;
	listings: Listing[];
}
interface Props {
	typeProps: ITypeProps;
	routeProps: any;
	hostProps?: IHostProps;
}

const Profile = ({ typeProps, routeProps, hostProps }: Props) => {
	const { cloudinary, mobile, user: currentUser } = useAppState();
	const logout = useLogout();

	const handleLogout = async () => {
		await logout();
		routeProps.history.push("/");
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
		RenderReviewItems,
	} = typeProps;

	const renderPronoun = () => {
		if (type === "host") {
			return "Guest's reviews";
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
							alt="User avatar"
							className="avatar"
							cldImg={cloudinary.image(`${type}_avatars/${id}`)}
						/>
					</div>
				</header>

				<div className="UserPage__badges">
					{type === "host" && hostProps && (
						<hostProps.RenderSuperhost medals={hostProps.medals} />
					)}
					<div className="badge">
						<StarSvg />
						<span>{reviewsCount} reviews</span>
					</div>
					<div className="badge">
						<ShieldSvg />
						<span>Identity Verified</span>
					</div>
				</div>

				{type === "host" && hostProps && (
					<hostProps.RenderDescription
						description={hostProps.description}
					/>
				)}
				{type === "host" && hostProps && (
					<hostProps.RenderListings
						cloudinary={cloudinary}
						listings={hostProps.listings}
						firstName={firstName}
					/>
				)}
				<div className="UserPage-divider" />

				<div className="UserPage__reviews">
					<div className="UserPage__reviews__title">
						<h2>{renderPronoun()}</h2>
					</div>
					<ul className="UserPage__reviews__content">
						{
							<RenderReviewItems
								reviews={reviews}
								cloudinary={cloudinary}
							/>
						}
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
							alt="User avatar"
							className="avatar"
							cldImg={cloudinary.image(`${type}_avatars/${id}`)}
						/>
					</div>

					{type === "host" && hostProps && (
						<hostProps.RenderSuperhost medals={hostProps.medals} />
					)}
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

					{type === "host" && hostProps && (
						<hostProps.RenderDescription
							description={hostProps.description}
						/>
					)}
					{type === "host" && hostProps && (
						<hostProps.RenderListings
							cloudinary={cloudinary}
							listings={hostProps.listings}
							firstName={firstName}
						/>
					)}

					<div className="UserPage-divider" />

					<div className="UserPage__reviews">
						<div className="UserPage__reviews__title">
							<h2>{renderPronoun()}</h2>
						</div>
						<ul className="UserPage__reviews__content">
							{
								<RenderReviewItems
									reviews={reviews}
									cloudinary={cloudinary}
								/>
							}
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
