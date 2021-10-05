import { Maybe } from "graphql/jsutils/Maybe";
import { definitelyNotAirbnb } from "../../utils/definitelyNotAirbnb";
import { ReactComponent as RightSvg } from "../../assets/icons/right-arrow.svg";

interface Props {
	listingDescription: Maybe<string>;
}

const ListingListingDescription = (props: Props) => {
	if (!props.listingDescription) return <></>;

	return (
		<div className="ListingListingDescription">
			<div className="ListingListingDescription__container">
				<p>{definitelyNotAirbnb(props.listingDescription)}</p>
			</div>

			<button className="show-more-button">
				<span>Show more</span>
				<RightSvg />
			</button>
		</div>
	);
};

export default ListingListingDescription;
