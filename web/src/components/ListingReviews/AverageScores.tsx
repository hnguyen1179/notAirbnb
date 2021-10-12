import { IAverageScores } from "./ListingReviewsDesktop";
import Score from "./Score";

interface Props {
	averageScores: IAverageScores;
}

const AverageScores = (props: Props) => {
	return (
		<div className="AverageScores">
			<ul className="AverageScores__column">
				<li className="AverageScores__column__category">
					<Score
						category="Cleanliness"
						value={props.averageScores.cleanliness}
					/>
				</li>
				<li className="AverageScores__column__category">
					<Score
						category="Communication"
						value={props.averageScores.communication}
					/>
				</li>
				<li className="AverageScores__column__category">
					<Score
						category="Check-in"
						value={props.averageScores.checkin}
					/>
				</li>
			</ul>
			<ul className="AverageScores__column">
				<li className="AverageScores__column__category">
					<Score
						category="Accuracy"
						value={props.averageScores.accuracy}
					/>
				</li>
				<li className="AverageScores__column__category">
					<Score
						category="Location"
						value={props.averageScores.location}
					/>
				</li>
				<li className="AverageScores__column__category">
					<Score category="Value" value={props.averageScores.value} />
				</li>
			</ul>
		</div>
	);
};

export default AverageScores;
