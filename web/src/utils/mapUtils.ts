import { fitBounds } from "google-map-react";
import { RefObject } from "react";
import { coordinates } from "../constants/coordinates";
import { Maybe } from "../generated/graphql";

interface ListingObj {
	address: string;
}

const getAverageMapValues = (listings: Maybe<ListingObj>[]) => {
	const coordinatesList = listings?.map((listing) => {
		if (!listing) return [];

		const { lat, lng } = coordinates[listing.address];

		return [lat, lng];
	});

	const total = coordinatesList?.reduce(([x1, y1], cv) => {
		const [x2, y2] = cv;

		return [x1 + x2, y1 + y2];
	});

	return { lat: total[0] / listings.length, lng: total[1] / listings.length };
};

const getZoomLevel = async (
	maps: any,
	listings: Maybe<ListingObj>[],
	map: RefObject<HTMLDivElement>
) => {
	const bounds = new maps.LatLngBounds();

	const coordinatesList = listings?.map((listing) => {
		if (!listing) return [];
		const { lat, lng } = coordinates[listing.address];
		return [lat, lng];
	});

	coordinatesList.forEach((c) => {
		bounds.extend(new maps.LatLng(c[0], c[1]));
	});

	const newBounds = {
		ne: {
			lat: bounds.getNorthEast().lat(),
			lng: bounds.getNorthEast().lng(),
		},
		sw: {
			lat: bounds.getSouthWest().lat(),
			lng: bounds.getSouthWest().lng(),
		},
	};

	const size = {
		width: map.current?.getBoundingClientRect().width || 0,
		height: map.current?.getBoundingClientRect().height || 0,
	};

	return fitBounds(newBounds, size);
};

export { getAverageMapValues, getZoomLevel };
