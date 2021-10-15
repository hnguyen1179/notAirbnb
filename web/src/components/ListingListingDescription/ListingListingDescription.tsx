import { definitelyNotAirbnb } from "../../utils/definitelyNotAirbnb";
import { ReactComponent as RightSvg } from "../../assets/icons/right-arrow.svg";
import { usePortal } from "../../hooks/usePortal";
import ListingShowMore from "../ListingShowMore/ListingShowMore";
import { showMoreStyle } from "../../pages/ListingPage";

interface Props {
	listingDescription: string;
	configType: "stiff" | "default";
}

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

			<Portal
				{...portalProps}
				style={showMoreStyle}
				configType={props.configType}
			>
				<ListingShowMore
					closePortal={closePortal}
					className="ShowListingDescription"
				>
					{(_containerRef) => <p>{props.listingDescription}</p>}
				</ListingShowMore>
			</Portal>
		</div>
	);
};

export default ListingListingDescription;
