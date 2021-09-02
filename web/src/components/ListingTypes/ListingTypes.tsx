import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import ListingTypeIcon from "./ListingTypeIcon";

const types = [
	"Nature getaways",
	"Summer stays",
	"Entire homes",
	"Pets allowed",
];

const ListingTypes = () => {
	const { cloudinary } = useContext(AppContext);

	return (
		<div className="ListingTypes">
			<div className="ListingTypes__header">
				<h3>Live anywhere</h3>
			</div>
			<ul className="ListingTypes__list">
				{types.map((type) => {
					const filename =
						"type-" + type.replace(" ", "-").toLowerCase();
					const img = cloudinary.image(`assets/${filename}`);

					return <ListingTypeIcon key={type} name={type} img={img} />;
				})}
			</ul>
		</div>
	);
};

export default ListingTypes;
