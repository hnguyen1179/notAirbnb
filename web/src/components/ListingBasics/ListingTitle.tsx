import { ReactComponent as StarSvg } from "../../assets/icons/filled-star.svg";

interface Props {
	title: string;
	averageScore: number;
	reviewsCount: number;
	city: string;
	state: string;
}

const ListingTitle = (props: Props) => {
	return (
		<div className="ListingTitle">
			<div className="ListingTitle__title">
				<h1>{props.title}</h1>
			</div>
			<div className="ListingTitle__sub">
				<span className="ListingTitle__sub__score">
					<StarSvg />
					<span className="score">{props.averageScore}</span>
					<button>
						<span className="reviews-count">{`(${props.reviewsCount} reviews)`}</span>
					</button>
				</span>
				<span className="spacer">·</span>
				<span className="ListingTitle__sub__location">
					<span>
						{props.city}, {props.state}, United States
					</span>
				</span>
			</div>
		</div>
	);
};

export default ListingTitle;
