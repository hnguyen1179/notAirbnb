import { Link } from "react-router-dom";
interface Props {
	locations: string[][];
	panel: number;
}

const InspirationPanel = ({ locations, panel }: Props) => {
	return (
		<div className="InspirationPanel">
			{locations[panel].map((location, idx) => {
				const [city, region, url] = location.split(", ");

				const defined = url ? "defined" : "";

				return (
					<div
						key={idx}
						className={`InspirationPanel__item ${defined}`}
					>
						<Link
							to={
								url
									? `/search?region=${city.replaceAll(
											" ",
											"+"
									  )}&page=1`
									: ""
							}
						>
							<div className="InspirationPanel__item__content">
								<span>{city}</span>
								<span>{region}</span>
							</div>
						</Link>
					</div>
				);
			})}
		</div>
	);
};

export default InspirationPanel;
