const initialWidth = () => {
	const small = window.matchMedia("(max-width: 743px)");
	const medium = window.matchMedia(
		"(min-width: 744px) and (max-width: 949px)"
	);
	const large = window.matchMedia(
		"(min-width: 950px) and (max-width: 1123px)"
	);
	const xlarge = window.matchMedia("(min-width: 1124px)");

	if (xlarge.matches) return "xlarge";
	if (large.matches) return "large";
	if (medium.matches) return "medium";
	if (small.matches) return "small";
	return "xlarge";
};

export { initialWidth };
