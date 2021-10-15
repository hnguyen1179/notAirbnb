import { Maybe } from "../../generated/graphql";
import { usePortal } from "../../hooks/usePortal";
import ListingShowMore from "../ListingShowMore/ListingShowMore";

interface Props {
	amenities: Maybe<string>[];
	configType: "stiff" | "default";
}

const style = {
	from: { opacity: 0, transform: "translateY(50vh)" },
	to: {
		opacity: 1,
		transform: "translateY(0vh)",
	},
};

const ListingAmenities = (props: Props) => {
	const { Portal, portalProps, openPortal, closePortal } = usePortal();

	if (!props.amenities.length) return <></>;

	const renderListItems = (length: number = 0) => {
		let array;

		if (length) {
			array = props.amenities.slice(0, length);
		} else {
			array = props.amenities;
		}

		return array.map((amenity, idx) => {
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
		});
	};

	return (
		<div className="ListingAmenities">
			<div className="ListingAmenities__title">
				<h2>What this place offers</h2>
			</div>

			<ul className="ListingAmenities__amenities">
				{renderListItems(5)}
			</ul>

			{props.amenities.length > 5 && (
				<button
					className="ListingAmenities__show-all show-all-button"
					onClick={openPortal}
				>
					<span>Show all {props.amenities.length} amenities</span>
				</button>
			)}

			<Portal
				{...portalProps}
				style={style}
				configType={props.configType}
			>
				<ListingShowMore
					closePortal={closePortal}
					className="ShowListingAmenities"
				>
					{(_containerRef) => (
						<>
							<h2>What this place offers</h2>
							<ul>{renderListItems()}</ul>
						</>
					)}
				</ListingShowMore>
			</Portal>
		</div>
	);
};

export default ListingAmenities;
