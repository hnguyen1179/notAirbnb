import GoogleReactMap from "google-map-react";
import { coordinates } from "../../constants/coordinates";
import { Maybe } from "../../generated/graphql";
import { createMapOptions } from "../../utils/createMapOptions";
import HouseMarkerBasic from "../MapMarkers/HouseMarkerBasic";

interface Props {
	city: string;
	state: string;
	address: string;
	locationDescription: Maybe<string> | undefined;
}

const ShowListingMap = (props: Props) => {
	const center = coordinates[props.address];

	return (
		<>
			<div className="column-1">
				<h2 className="title">Where you'll be</h2>

				<div className="location">
					{props.city}, {props.state}, United States
				</div>

				<p className="description">{props.locationDescription}</p>
			</div>
			<div className="column-2">
				<div className="map-container">
					{/* <GoogleReactMap
						bootstrapURLKeys={{
							key: process.env.REACT_APP_GOOGLE_API_KEY as string,
						}}
						options={createMapOptions}
						defaultCenter={center}
						defaultZoom={16}
					>
						<HouseMarkerBasic lat={center.lat} lng={center.lng} />
					</GoogleReactMap> */}
				</div>
			</div>
		</>
	);
};

export default ShowListingMap;
