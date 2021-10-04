import { RefObject } from "react";

export const isOutsideViewport = (
	container: RefObject<HTMLDivElement>,
	element: RefObject<HTMLDivElement>
) => {
	if (!container.current || !element.current) return false;

	const {
		top: containerTop,
		left: containerLeft,
		bottom: containerBottom,
		right: containerRight,
	} = container.current?.getBoundingClientRect();

	const {
		top: elementTop,
		left: elementLeft,
		bottom: elementBottom,
		right: elementRight,
	} = element.current?.getBoundingClientRect();

	if (
		elementLeft < containerLeft ||
		elementTop < containerTop ||
		elementBottom > containerBottom ||
		elementRight > containerRight
	) {
		return true;
	}

	return false;
};
