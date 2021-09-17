import { format } from "date-fns";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { AdvancedImage } from "@cloudinary/react";

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

// interface Props {
//   review: ReviewPartial;
// }

const ReviewItem = ({ review }: any) => {
	const { cloudinary } = useContext(AppContext);
	const date = new Date(review?.date);

	return (
		<li key={review?.id} className="ReviewItem">
			<div className="ReviewItem__date">{format(date, "MMMM yyyy")}</div>
			<div className="ReviewItem__content">{review?.content}</div>
			<div className="ReviewItem__host">
				<div className="ReviewItem__host__avatar">
					<a href={`/host/${review.listing.host.id}`}>
						<AdvancedImage
							cldImg={cloudinary.image(
								`host_avatars/${review.listing.host.id}`
							)}
						/>
					</a>
				</div>
				<div className="ReviewItem__host__details">
					<div className="ReviewItem__host__details__name">
						Review for {review?.listing?.host?.firstName}
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
