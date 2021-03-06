import GoogleReactMap from "google-map-react";
import { coordinates } from "../../constants/coordinates";
import { Maybe } from "../../generated/graphql";
import { createMapOptionsListingPage } from "../../utils/createMapOptions";
import HouseMarkerBasic from "../MapMarkers/HouseMarkerBasic";
import { ReactComponent as RightSvg } from "../../assets/icons/right-arrow.svg";
import { definitelyNotAirbnb } from "../../utils/definitelyNotAirbnb";
import { MouseEventHandler } from "react";

interface Props {
	city: string;
	state: string;
	address: string;
	locationDescription: Maybe<string> | undefined;
	openPortal: MouseEventHandler<HTMLButtonElement>;
}

const ListingMap = (props: Props) => {
	const center = coordinates[props.address];

	return (
		<div className="ListingMap">
			<div className="ListingMap__title">
				<h2>Where you'll be</h2>
			</div>

			<div className="ListingMap__map">
				<GoogleReactMap
					bootstrapURLKeys={{
						key: process.env.REACT_APP_GOOGLE_API_KEY as string,
					}}
					options={createMapOptionsListingPage}
					defaultCenter={center}
					defaultZoom={16}
				>
					<HouseMarkerBasic lat={center.lat} lng={center.lng} />
				</GoogleReactMap>
			</div>

			<div className="ListingMap__location">
				<span>
					{props.city}, {props.state}, United States
				</span>
			</div>

			{props.locationDescription && (
				<div className="ListingMap__description">
					<div className="ListingMap__description__container">
						<p>{definitelyNotAirbnb(props.locationDescription)}</p>
					</div>

					<button
						className="show-more-button"
						onClick={props.openPortal}
					>
						<span>Show more</span>
						<RightSvg />
					</button>
				</div>
			)}
		</div>
	);
};

export default ListingMap;
