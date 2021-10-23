import { AdvancedImage } from "@cloudinary/react";
import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { useAppState } from "../../context/AppContext";
import { Maybe } from "../../generated/graphql";
import { definitelyNotAirbnb } from "../../utils/definitelyNotAirbnb";

interface ReviewPartial {
	__typename?: "Review";
	id: string;
	date: any;
	content: string;
	listing?: Maybe<{
		__typename?: "Listing";
		id: string;
		title: string;
		region: string;
	}>;
	author?: Maybe<{
		__typename?: "User";
		id: string;
		firstName: string;
		dateJoined: string;
	}>;
}

interface Props {
	review: ReviewPartial;
	openPortal: MouseEventHandler<HTMLButtonElement>;
}

const ListingReviewsItem = (props: Props) => {
	const { cloudinary } = useAppState();

	return (
		<li className="ListingReviewsItem">
			<header className="ListingReviewsItem__header">
				<Link to={`/user/${props.review.author?.id}`}>
					<div className="ListingReviewsItem__header__avatar">
						<AdvancedImage
							alt="User avatar"
							cldImg={cloudinary.image(
								`user_avatars/${props.review.author?.id}`
							)}
							loading="lazy"
						/>
					</div>
					<div className="ListingReviewsItem__header__author">
						<div className="first-name">
							{props.review.author?.firstName}
						</div>
						<div className="review-date">
							{new Date(props.review.date).toLocaleDateString(
								"en",
								{
									month: "long",
									year: "numeric",
								}
							)}
						</div>
					</div>
				</Link>
			</header>
			<div className="ListingReviewsItem__content">
				<p>{definitelyNotAirbnb(props.review.content)}</p>
			</div>

			<button
				className="ListingReviewsItem__show-more show-more-button"
				onClick={props.openPortal}
			>
				Show more
			</button>
		</li>
	);
};

export default ListingReviewsItem;
