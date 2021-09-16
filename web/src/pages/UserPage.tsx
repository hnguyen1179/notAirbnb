import React, { useState, useContext } from "react";
import { RouteProps } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import MobileNavbar from "../components/MobileNavbar/MobileNavbar";
import { AdvancedImage } from "@cloudinary/react";
import {
	useUserByIdQuery,
	useReviewsByUserIdQuery,
} from "../generated/graphql";

import { ReactComponent as StarSvg } from "../assets/icons/star.svg";
import { ReactComponent as ShieldSvg } from "../assets/icons/shield.svg";
import { ReactComponent as OutlinedStarSvg } from "../assets/icons/outlined-star.svg";
import Loading from "../components/Loading";
import useLogout from "../hooks/useLogout";
import ReviewItem from "../components/ReviewItem/ReviewItem";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

interface Props {
	id: string;
	renderProps: any;
}

const UserPage = ({ id, renderProps }: Props) => {
	const { cloudinary, mobile, user: currentUser } = useContext(AppContext);
	const [loadingMoreReviews, setLoadingMoreReviews] = useState(false);
	const logout = useLogout();

	const {
		loading: userLoading,
		error: userError,
		data: userData,
	} = useUserByIdQuery({
		variables: { id },
	});

	const {
		error: reviewsError,
		data: reviewsData,
		fetchMore,
	} = useReviewsByUserIdQuery({
		variables: { id },
	});

	if (userLoading)
		return (
			<div className="UserPage-loading">
				<Loading />
			</div>
		);

	if (userError || reviewsError)
		return (
			<div>
				{userError}
				{reviewsError}
			</div>
		);

	// TODO Figure out what destructuring doesn't work?
	// Maybe these values are considered 'optional'? Hence they
	// must be verified before? Below works
	// if (userData?.userById) {
	// 	const { firstName, lastName, dateJoined, reviews } = userData.userById;
	// }

	if (userData?.userById == null || reviewsData?.reviewsByUserId == null) {
		return (
			<div className="UserPage-loading">
				<Loading />
			</div>
		);
	}

	const handleLogout = async () => {
		await logout();
		renderProps.history.push("/");
	};

	const HandleFetchReviews = async () => {
		setLoadingMoreReviews(true);

		await fetchMore({
			variables: {
				offset: reviewsData.reviewsByUserId.length,
			},
		});

		setLoadingMoreReviews(false);
	};

	const isUser = currentUser && currentUser.id === id;

	const { firstName, lastName, dateJoined, reviewsCount } =
		userData?.userById;
	const reviews = reviewsData.reviewsByUserId;
	console.log(currentUser);

	return (
		<div className="UserPage">
			{!mobile && (
				<>
					<Navbar notLanding={true} />
					<div className="Navbar-filler"></div>
				</>
			)}

			<div className="UserPage-container">
				<header className="UserPage__header">
					<div className="UserPage__header__title">
						<h1>
							Hi, I'm {firstName} {lastName}
						</h1>
						<span>{dateJoined}</span>
					</div>
					<div className="UserPage__header__avatar">
						<AdvancedImage
							className="avatar"
							cldImg={cloudinary.image(`user_avatars/${id}`)}
						/>
					</div>
				</header>

				<div className="UserPage__badges">
					<div>
						<OutlinedStarSvg />
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
						<StarSvg />
						<h2>{isUser ? "Your" : "Their"} reviews</h2>
					</div>
					<ul className="UserPage__reviews__content">
						{reviews.map((review) => {
							return (
								<ReviewItem review={review} key={review.id} />
							);
						})}
					</ul>
					{reviews.length !== reviewsCount &&
						(loadingMoreReviews ? (
							<button
								className={`UserPage__reviews__more-button ${
									loadingMoreReviews ? "loading" : ""
								}`}
								onClick={HandleFetchReviews}
							>
								<Loading />
							</button>
						) : (
							<button
								className="UserPage__reviews__more-button"
								onClick={HandleFetchReviews}
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

export default UserPage;
