import { Loader } from "@googlemaps/js-api-loader";
import { MouseEvent, RefObject, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Maybe } from "../../generated/graphql";
import { PartialListing } from "../SearchResultsItem/SearchResultsItem";
import { coordinates, regions } from "../../constants/coordinates";
import { getZoomLevel } from "../../utils/mapUtils";
import { style } from "../../constants/simpleMapStyle";
import PriceMarker from "../MapMarkers/PriceMarker";
import { Cloudinary } from "@cloudinary/base";

interface Props {
	listings: Maybe<PartialListing>[] | undefined;
	currentListing: number;
	region: string;
	mapRef: RefObject<HTMLDivElement>;
	cloudinary: Cloudinary;
}

const SearchPageMap = ({
	listings,
	currentListing,
	mapRef,
	cloudinary,
}: Props) => {
	console.log("rerendered");
	const [clickIdx, setClickIdx] = useState(-1);
	const [hover, setHover] = useState(false);
	const [mapState, setMapState] = useState({
		center: regions["Anywhere"],
		zoom: 5,
	});

	useEffect(() => {
		if (!listings?.length) return;
		console.log(" in gooogle map !");

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
					zoom,
					center,
				});
			});
		})();
	}, [listings, mapRef]);

	const createMapOptions = (maps: any) => ({
		gestureHandling: "auto",
		scrollwheel: true,
		zoomControl: true,
		zoomControlOptions: {
			position: maps.ControlPosition.TOP_RIGHT,
		},
		fullscreenControl: true,
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
				onChildClick={(hoverKey) => console.log(hoverKey)}
				margin={[100, 100, 100, 100]}
				draggable={hover}
				// TODO Make this draggable conditional based on whether or not you're
				// hovering over a marker!! mouseEnter: true: mouseOut: false
			>
				{listings?.map((listing, idx) => {
					if (!listing) return "";

					const isCurrent = idx === currentListing;
					const isClicked = idx === clickIdx;
					const { lat, lng } = coordinates[listing?.address];

					const handleClickMarker = (
						e: MouseEvent<HTMLDivElement>
					) => {
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
							mapRef={mapRef}
							cloudinary={cloudinary}
							setHover={setHover}
						/>
					);
				})}
			</GoogleMapReact>
		</>
	);
};

export default SearchPageMap;
