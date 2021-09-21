import { format } from "date-fns";
import { AdvancedImage } from "@cloudinary/react";
import { Review } from "../../generated/graphql";
import { Cloudinary } from "@cloudinary/base";

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
	id: string; // of host or user for url purposes
	firstName: string;
	dateJoined: string;
	type: "host" | "user";
	cloudinary: Cloudinary;
}

const ReviewItem = ({
	id,
	review,
	type,
	firstName,
	dateJoined,
	cloudinary,
}: Props) => {
	const date = new Date(review?.date);

	const renderNamePrefix = () => {
		if (type === "host") {
			return "";
		} else {
			return "Review for";
		}
	};

	const urlType = () => {
		if (type === "user") {
			return "host";
		} else {
			return "user";
		}
	};

	return (
		<li key={review?.id} className="ReviewItem">
			{type === "host" && (
				<div className="ReviewItem__listing">
					<a href={`/listing/${review.listingId}`}>
						<div className="ReviewItem__listing__title">
							{review.listing?.title}
						</div>
					</a>
				</div>
			)}
			<div className="ReviewItem__date">{format(date, "MMMM yyyy")}</div>
			<div className="ReviewItem__content">{review?.content}</div>
			<div className="ReviewItem__host">
				<div className="ReviewItem__host__avatar">
					<a href={`/${urlType()}/${id}`}>
						<AdvancedImage
							cldImg={cloudinary.image(
								`${urlType()}_avatars/${id}`
							)}
						/>
					</a>
				</div>
				<div className="ReviewItem__host__details">
					<div className="ReviewItem__host__details__name">
						{renderNamePrefix()} {firstName}
					</div>
					<div className="ReviewItem__host__details__date-joined">
						{dateJoined}
					</div>
				</div>
			</div>
		</li>
	);
};

export default ReviewItem;
