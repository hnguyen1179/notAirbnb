import { Maybe } from "graphql/jsutils/Maybe";
import { definitelyNotAirbnb } from "../../utils/definitelyNotAirbnb";
import { ReactComponent as RightSvg } from "../../assets/icons/right-arrow.svg";
import { usePortal } from "../../hooks/usePortal";
import ShowListingDescription from "./ShowListingDescription";

interface Props {
	listingDescription: string;
}

const style = {
	from: { opacity: 0, transform: "translateY(50vh)" },
	to: {
		opacity: 1,
		transform: "translateY(0vh)",
	},
};

const ListingListingDescription = (props: Props) => {
	const { Portal, portalProps, openPortal, closePortal } = usePortal();
	const revisedDescription = definitelyNotAirbnb(props.listingDescription);

	return (
		<div className="ListingListingDescription">
			<div className="ListingListingDescription__container">
				<p>{revisedDescription}</p>
			</div>

			<button className="show-more-button" onClick={openPortal}>
				<span>Show more</span>
				<RightSvg />
			</button>

			<Portal {...portalProps} style={style} configType="stiff">
				<ShowListingDescription
					listingDescription={revisedDescription}
				/>
			</Portal>
		</div>
	);
};

export default ListingListingDescription;
