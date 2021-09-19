import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import MobileNavbar from "../components/MobileNavbar/MobileNavbar";
import { AdvancedImage } from "@cloudinary/react";
import {
	useUserByIdQuery,
	useReviewsByUserIdQuery,
} from "../generated/graphql";

import { ReactComponent as FilledStarSvg } from "../assets/icons/filled-star.svg";
import { ReactComponent as ShieldSvg } from "../assets/icons/shield.svg";
import { ReactComponent as StarSvg } from "../assets/icons/star.svg";

import Loading from "../components/Loading";
import useLogout from "../hooks/useLogout";
import ReviewItem from "../components/ReviewItem/ReviewItem";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { useFetchUserReviews } from "../hooks/useFetchUserReviews";

interface Props {
	id: string;
	renderProps: any;
}

const UserPage = ({ id, renderProps }: Props) => {
	const { cloudinary, mobile, user: currentUser } = useContext(AppContext);
	const {
		error: reviewsError,
		data: reviewsData,
		handleFetchMore,
		fetchLoading,
	} = useFetchUserReviews(id);
	const logout = useLogout();

	const {
		loading: userLoading,
		error: userError,
		data: userData,
	} = useUserByIdQuery({
		variables: { id },
	});

	if (userLoading)
		return (
			<div className="page-loading">
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

	if (userData?.userById == null || reviewsData?.reviewsByUserId == null) {
		return (
			<div className="page-loading">
				<Loading />
			</div>
		);
	}

	const handleLogout = async () => {
		await logout();
		renderProps.history.push("/");
	};

	const isUser = currentUser && currentUser.id === id;

	const { firstName, dateJoined, reviewsCount } = userData?.userById;
	const reviews = reviewsData.reviewsByUserId;

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
							cldImg={cloudinary.image(`user_avatars/${id}`)}
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
							cldImg={cloudinary.image(`user_avatars/${id}`)}
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
							{reviews.map((review) => {
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
