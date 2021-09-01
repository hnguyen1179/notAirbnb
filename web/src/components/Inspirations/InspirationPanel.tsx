import React from "react";

interface Props {
	locations: string[][];
	panel: number;
}

const InspirationPanel = ({ locations, panel }: Props) => {
	return (
		<div className="InspirationPanel">
			{locations[panel].map((location) => {
				const [city, region] = location.split(", ");

				return (
					<div className="InspirationPanel__item">
						<a href="">
							<div className="InspirationPanel__item__content">
								<span>{city}</span>
								<span>{region}</span>
							</div>
						</a>
					</div>
				);
			})}
		</div>
	);
};

export default InspirationPanel;
