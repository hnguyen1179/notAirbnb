import React, { MouseEvent, useState } from "react";
import { Maybe } from "../../generated/graphql";
import { PartialListing } from "../SearchResultsItem/SearchResultsItem";

interface Props {
	lat: number;
	lng: number;
	listing: Maybe<PartialListing>;
	$hover?: boolean;
	isCurrent: boolean;
	isClicked: boolean;
	handleClickMarker: (e: MouseEvent<HTMLDivElement>) => void;
}

const PriceMarker = ({
	listing,
	$hover,
	isCurrent,
	isClicked,
	handleClickMarker,
}: Props) => {
	if (!listing) return <></>;

	return (
		<div
			className="PriceMarker"
			aria-selected={isCurrent || isClicked}
			onClick={handleClickMarker}
		>
			<span>${listing.price}</span>

			<div className="PriceMarker__details"></div>
		</div>
	);
};

export default PriceMarker;
