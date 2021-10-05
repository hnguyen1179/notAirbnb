import React from "react";
import { Maybe } from "../../generated/graphql";

interface Props {
	amenities: Maybe<string>[];
}

const ListingAmenities = (props: Props) => {
	if (!props.amenities.length) return <></>;

	return (
		<div className="ListingAmenities">
			<div className="ListingAmenities__title">
				<h2>What this place offers</h2>
			</div>

			<ul className="ListingAmenities__amenities">
				{props.amenities.slice(0, 5).map((amenity, idx) => {
					const fileName = amenity?.replaceAll(" ", "_");

					return (
						<li key={idx}>
							<img
								src={`/assets/amenities/${fileName}.svg`}
								alt={amenity || ""}
							/>
							<span>{amenity}</span>
						</li>
					);
				})}
			</ul>

			<button className="ListingAmenities__see-more">
				<span>Show all {props.amenities.length} amenities</span>
			</button>
		</div>
	);
};

export default ListingAmenities;
