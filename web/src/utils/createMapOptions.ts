import { style } from "../constants/simpleMapStyle";

const createMapOptions = (maps: any) => ({
	gestureHandling: "auto",
	scrollwheel: true,
	disableDoubleClickZoom: true,
	zoomControl: true,
	zoomControlOptions: {
		position: maps.ControlPosition.TOP_RIGHT,
	},
	fullscreenControl: true,
	styles: style,
});

const createMapOptionsListingPage = (maps: any) => ({
	gestureHandling: "auto",
	scrollwheel: false,
	zoomControl: true,
	zoomControlOptions: {
		position: maps.ControlPosition.TOP_RIGHT,
	},
	fullscreenControl: true,
	styles: style,
});

export { createMapOptions, createMapOptionsListingPage };
