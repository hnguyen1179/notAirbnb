import { format } from "date-fns";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { AdvancedImage } from "@cloudinary/react";
import { Review } from "../../generated/graphql";

// interface HostPartial {
// 	id: string;
// 	firstName: string;
// 	dateJoined: string;
// }

// interface ListingPartial {
// 	host: HostPartial | undefined | null;
// }

// interface ReviewPartial {
// 	id: string;
// 	listingId: string;
// 	date: Date;
// 	content: string;
// 	scores: (string | null)[];
// 	listing: ListingPartial | undefined | null;
// }

interface Props {
	review: Review;
	type: "host" | "user";
}

const ReviewItem = ({ review, type }: Props) => {
	const { cloudinary } = useContext(AppContext);
	const date = new Date(review?.date);

	const renderNamePrefix = () => {
		if (type === "host") {
			return "";
		} else {
			return "Review for";
		}
	};

	// id
	// date
	// content
	// listing > host > id
	// authorId
	// type
	//

	return (
		<li key={review?.id} className="ReviewItem">
			<div className="ReviewItem__date">{format(date, "MMMM yyyy")}</div>
			<div className="ReviewItem__content">{review?.content}</div>
			<div className="ReviewItem__host">
				<div className="ReviewItem__host__avatar">
					<a href={`/${type}/${review.listing.host.id}`}>
						<AdvancedImage
							cldImg={cloudinary.image(
								`${type}_avatars/${review.listing.host.id}`
							)}
						/>
					</a>
				</div>
				<div className="ReviewItem__host__details">
					<div className="ReviewItem__host__details__name">
						{renderNamePrefix()} {review?.listing?.host?.firstName}
					</div>
					<div className="ReviewItem__host__details__date-joined">
						{review?.listing?.host?.dateJoined}
					</div>
				</div>
			</div>
		</li>
	);
};

export default ReviewItem;
