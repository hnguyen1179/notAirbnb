import { MouseEvent, RefObject, useEffect, useRef, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Maybe } from "../../generated/graphql";
import { PartialListing } from "../SearchResultsItem/SearchResultsItem";
import { coordinates, regions } from "../../constants/coordinates";
import { getZoomLevel } from "../../utils/mapUtils";
import PriceMarker from "../MapMarkers/PriceMarker";
import { Cloudinary } from "@cloudinary/base";
import { createMapOptions } from "../../utils/createMapOptions";

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
	const [clickIdx, setClickIdx] = useState(-1);
	const [mapState, setMapState] = useState({
		center: regions["Anywhere"],
		zoom: 5,
	});

	const mapsRef = useRef(null);

	const apiIsLoaded = async (maps: any) => {
		if (!listings || !maps) return;
		mapsRef.current = maps;
		const { zoom, center } = await getZoomLevel(maps, listings, mapRef);

		setMapState({
			center,
			zoom: zoom - 1,
		});
	};

	useEffect(() => {
		apiIsLoaded(mapsRef.current);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [listings, mapRef]);

	const resetClickIdx = () => {
		setClickIdx(-1);
	};

	return (
		<>
			<GoogleMapReact
				bootstrapURLKeys={{
					key: process.env.REACT_APP_GOOGLE_API_KEY as string,
				}}
				defaultCenter={regions["Anywhere"]}
				defaultZoom={5}
				center={mapState.center}
				zoom={mapState.zoom}
				options={createMapOptions}
				onClick={resetClickIdx}
				onZoomAnimationStart={resetClickIdx}
				yesIWantToUseGoogleMapApiInternals
				onGoogleApiLoaded={({ maps }) => apiIsLoaded(maps)}
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
						/>
					);
				})}
			</GoogleMapReact>
		</>
	);
};

export default SearchPageMap;
