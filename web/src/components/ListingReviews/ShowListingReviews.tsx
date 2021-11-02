import { FetchMoreQueryOptions } from "@apollo/client";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { ReactComponent as StarSvg } from "../../assets/icons/filled-star.svg";
import { Exact, Maybe, ReviewsByListingIdQuery } from "../../generated/graphql";
import Loading from "../Loading";
import ListingReviewsItem from "./ListingReviewsItem";

interface Props {
	reviews: ReviewsByListingIdQuery;
	averageScore: number;
	reviewsCount: number;
	fetchMore: (
		options: FetchMoreQueryOptions<
			Exact<{
				id: string;
				offset?: Maybe<number> | undefined;
			}>,
			ReviewsByListingIdQuery
		>
	) => void;
	containerRef: React.RefObject<HTMLDivElement>;
	openPortal: MouseEventHandler<HTMLButtonElement>;
}

const ShowListingReviews = (props: Props) => {
	const [loading, setLoading] = useState(false);
	const listRef = useRef<HTMLUListElement>(null);
	const offsetRef = useRef(8);

	useEffect(() => {
		const element = props.containerRef.current;

		const handleScroll: EventListener = async () => {
			const atBottom =
				element?.scrollTop ===
				(element?.scrollHeight || 0) - (element?.offsetHeight || 0);

			if (
				atBottom &&
				offsetRef.current <= props.reviewsCount &&
				props.reviews.reviewsByListingId.length !== props.reviewsCount
			) {
				setLoading(true);

				await props.fetchMore({
					variables: {
						offset: offsetRef.current,
					},
				});

				setLoading(false);

				offsetRef.current += 8;
			}
		};

		element?.addEventListener("scroll", handleScroll);

		return () => {
			element?.removeEventListener("scroll", handleScroll);
		};
	}, [props, props.containerRef]);

	return (
		<>
			<header>
				<h2>
					<StarSvg />
					<span>{props.averageScore}</span>
					<span className="divider">·</span>
					<span>{props.reviewsCount} reviews</span>
				</h2>
			</header>
			<ul ref={listRef}>
				{props.reviews.reviewsByListingId.map((review, idx) => {
					return (
						<ListingReviewsItem
							key={idx}
							review={review}
							openPortal={props.openPortal}
						/>
					);
				})}
			</ul>
			<div className={`loading ${loading ? "active" : ""}`}>
				<Loading />
			</div>
		</>
	);
};

export default ShowListingReviews;
