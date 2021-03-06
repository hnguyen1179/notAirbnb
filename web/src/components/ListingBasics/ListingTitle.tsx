import { MouseEventHandler } from "react";
import { ReactComponent as StarSvg } from "../../assets/icons/filled-star.svg";
import { ReactComponent as SuperhostSvg } from "../../assets/icons/super.svg";
import { nonBreakingSentence } from "../../utils/nonBreakingSentence";

interface Props {
	title: string;
	averageScore: number;
	reviewsCount: number;
	city: string;
	state: string;
	superhost: boolean;
	openPortal: MouseEventHandler<HTMLButtonElement>;
}

const ListingTitle = (props: Props) => {
	const renderReviewScore = () => {
		if (!props.reviewsCount) {
			return "No reviews";
		} else if (props.reviewsCount && !props.averageScore) {
			return "No scores";
		} else {
			return props.averageScore;
		}
	};

	const locationString = `${props.city}, ${props.state}, United States`;
	return (
		<div className="ListingTitle">
			<div className="ListingTitle__title">
				<h1>{nonBreakingSentence(props.title)}</h1>
			</div>
			<div className="ListingTitle__sub">
				<span className="ListingTitle__sub__score">
					<StarSvg />
					<span className="score">{renderReviewScore()}</span>
					<button onClick={props.openPortal}>
						<span className="reviews-count">{`(${props.reviewsCount} reviews)`}</span>
					</button>
				</span>
				<span className="spacer">·</span>

				<span className="ListingTitle__sub__location">
					<span>{locationString}</span>
				</span>

				{props.superhost && (
					<>
						<span className="spacer">·</span>
						<span className="ListingTitle__sub__superhost">
							<SuperhostSvg />
							<span>Superhost</span>
						</span>
					</>
				)}
			</div>
		</div>
	);
};

export default ListingTitle;
