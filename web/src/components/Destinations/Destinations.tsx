import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import DestinationIcon from "./DestinationIcon";

const LOCATIONS = [
	{ name: "Los Angeles", distance: "45 minute drive" },
	{ name: "San Diego", distance: "2 hour drive" },
	{ name: "Las Vegas", distance: "5 hour drive" },
	{ name: "Henderson", distance: "5.5 hour drive" },
	{ name: "Paradise", distance: "5 hour drive" },
	{ name: "Big Bear", distance: "2.5 hour drive" },
	{ name: "Palm Springs", distance: "2 hour drive" },
	{ name: "Santa Barbara", distance: "2.5 hour drive" },
];

const Destinations = () => {
	const { cloudinary } = useContext(AppContext);

	return (
		<div className="Destinations">
			<header className="Destinations__header">
				<h3>Explore nearby</h3>
			</header>
			<ul className="Destinations__list">
				{LOCATIONS.map((location) => {
					const filename =
						location.name.replace(" ", "-").toLowerCase() + "-logo";
					const img = cloudinary.image(`assets/${filename}`);

          return <DestinationIcon key={location.name} location={location} img={img} />;
				})}
			</ul>
		</div>
	);
};

export default Destinations;
