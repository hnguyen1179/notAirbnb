import { Maybe } from "../../generated/graphql";

interface Props {
	highlights: Maybe<string>[];
}

const ListingHighlights = (props: Props) => {
	return (
		<ul className="ListingHighlights">
			{props.highlights.map((highlightStr, idx) => {
				if (!highlightStr) return <></>;
				const [highlight, description] = highlightStr.split("||");
				let fileName = highlight.replaceAll(" ", "_").toLowerCase();
				if ((/superhost/).test(fileName)) fileName = 'superhost'

				const editedDescription = description.replaceAll(
					"Airbnb",
					"notAirbnb"
				);

				return (
					<li className="ListingHighlights__highlight" key={idx}>
						<img src={`/assets/highlights/${fileName}.svg`} />

						<div className="ListingHighlights__highlight__details">
							<span className="title">{highlight}</span>
							<span className="description">
								{editedDescription}
							</span>
						</div>
					</li>
				);
			})}
		</ul>
	);
};

export default ListingHighlights;
