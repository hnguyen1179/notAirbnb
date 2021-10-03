import { Loader } from "@googlemaps/js-api-loader";
import GoogleMapReact from "google-map-react";
import { Maybe } from "../../generated/graphql";
import { PartialListing } from "../SearchResultsItem/SearchResultsItem";
import HouseMarkerBasic from "../MapMarkers/HouseMarkerBasic";
import { coordinates, regions } from "../../constants/coordinates";
import { getAverageMapValues, getZoomLevel } from "../../utils/mapUtils";
import { style } from "../../constants/simpleMapStyle";
import PriceMarker from "../MapMarkers/PriceMarker";
import { MouseEvent, RefObject, useEffect, useState } from "react";

interface Props {
	listings: Maybe<PartialListing>[] | undefined;
	mobile: boolean;
	currentListing: number;
	region: string;
	mapRef: RefObject<HTMLDivElement>;
}

const SearchPageMap = ({ listings, mobile, currentListing, mapRef }: Props) => {
	const [clickIdx, setClickIdx] = useState(-1);
	const [mapState, setMapState] = useState({
		center: regions["Anywhere"],
		zoom: 5,
	});

	useEffect(() => {
		if (!listings?.length) return;

		(async () => {
			const loader = new Loader({
				apiKey: process.env.REACT_APP_GOOGLE_API_KEY as string,
				version: "weekly",
			});

			loader.load().then(async (google) => {
				const { zoom, center } = await getZoomLevel(
					google,
					listings,
					mapRef
				);

				setMapState({
					zoom: zoom > 11 ? 11 : zoom,
					center,
				});
			});
		})();
	}, [listings, mapRef]);

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

	const resetClickIdx = () => {
		setClickIdx(-1);
	};

	return (
		<>
			<GoogleMapReact
				bootstrapURLKeys={{
					key: process.env.REACT_APP_GOOGLE_API_KEY as string,
				}}
				defaultCenter={mapState.center}
				defaultZoom={mapState.zoom}
				options={createMapOptions}
				onClick={resetClickIdx}
				onZoomAnimationStart={resetClickIdx}
			>
				{listings?.map((listing, idx) => {
					if (!listing) return "";

					const isCurrent = idx === currentListing;
					const isClicked = idx === clickIdx;
					const { lat, lng } = coordinates[listing?.address];

					const handleClickMarker = (e: MouseEvent<HTMLDivElement>) => {
						e.stopPropagation();
						setClickIdx(idx);
					};

					return (
						<PriceMarker
							key={lat.toString() + lng.toString()}
							lat={lat}
							lng={lng}
							listing={listing}
							isCurrent={isCurrent}
							isClicked={isClicked}
							handleClickMarker={handleClickMarker}
						/>
					);
				})}
			</GoogleMapReact>
		</>
	);
};

export default SearchPageMap;
