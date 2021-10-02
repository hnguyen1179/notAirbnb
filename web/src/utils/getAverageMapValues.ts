import { coordinates } from "../constants/coordinates";
import { Maybe } from "../generated/graphql";

interface ListingObj {
	address: string;
}

const getAverageMapValues = (listings: Maybe<ListingObj>[]) => {
	let averageListings = listings?.slice();
	const coordinatesList = averageListings?.map((listing) => {
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

export { getAverageMapValues };
