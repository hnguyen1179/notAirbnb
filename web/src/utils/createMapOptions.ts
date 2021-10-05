import { style } from "../constants/simpleMapStyle";

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

export { createMapOptions };
