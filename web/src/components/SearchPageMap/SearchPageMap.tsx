import React from "react";
import GoogleMapReact from "google-map-react";
import { Maybe } from "../../generated/graphql";
import { PartialListing } from "../SearchResultsItem/SearchResultsItem";
import HouseMarkerBasic from "../MapMarkers/HouseMarkerBasic";
import { coordinates, regions } from "../../constants/coordinates";
import { getAverageMapValues } from "../../utils/getAverageMapValues";
import { style } from "../../constants/simpleMapStyle";
import PriceMarker from "../MapMarkers/PriceMarker";

interface Props {
	listings: Maybe<PartialListing>[] | undefined;
	mobile: boolean;
}

const SearchPageMap = ({ listings, mobile }: Props) => {
	console.log("rerender map");
	// Function to determine average Lat Long of all listings given
	const initialMapValues = {
		zoom: 10,
		center: {
			lat: 0,
			lng: 0,
		},
	};

	const createMapOptions = (maps: any) => ({
		gestureHandling: mobile ? "none" : "auto",
		scrollwheel: true,
		zoomControl: mobile ? false : true,
		zoomControlOptions: {
			position: maps.ControlPosition.TOP_RIGHT,
		},
		fullscreenControl: false,
		styles: style,
	});

	if (listings) {
		initialMapValues.center = getAverageMapValues(listings);
	}

	return (
		<>
			<GoogleMapReact
				bootstrapURLKeys={{
					key: process.env.REACT_APP_GOOGLE_API_KEY as string,
				}}
				defaultCenter={initialMapValues.center}
				defaultZoom={initialMapValues.zoom}
				options={createMapOptions}
			>
				{listings?.map((listing) => {
					if (!listing) return "";

					const { lat, lng } = coordinates[listing?.address];

					return (
						<PriceMarker
							key={lat.toString() + lng.toString()}
							lat={lat}
							lng={lng}
							price={listing.price}
						/>
					);
				})}
			</GoogleMapReact>
		</>
	);
};

export default SearchPageMap;
