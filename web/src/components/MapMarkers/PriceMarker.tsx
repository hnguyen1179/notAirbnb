import { Cloudinary } from "@cloudinary/base";
import { MouseEvent, RefObject, useRef } from "react";
import { Maybe } from "../../generated/graphql";
import ItemDetailsMobile from "../SearchResultsItem/ItemDetailsMobile";
import PictureCarousel from "../SearchResultsItem/PictureCarousel";
import { PartialListing } from "../SearchResultsItem/SearchResultsItem";

interface Props {
	lat: number;
	lng: number;
	listing: Maybe<PartialListing>;
	$hover?: boolean;
	isCurrent: boolean;
	isClicked: boolean;
	handleClickMarker: (e: MouseEvent<HTMLDivElement>) => void;
	mapRef: RefObject<HTMLDivElement>;
	cloudinary: Cloudinary;
}

const PriceMarker = ({
	listing,
	$hover,
	isCurrent,
	isClicked,
	handleClickMarker,
	mapRef,
	cloudinary,
}: Props) => {
	const markerRef = useRef<HTMLDivElement>(null);

	if (!listing) return <></>;

	return (
		<div
			className="PriceMarker"
			aria-selected={isCurrent || isClicked}
			ref={markerRef}
			onClick={handleClickMarker}
		>
			<span>${listing.price}</span>

			<div className="PriceMarker__details" aria-hidden={!isClicked}>
				<PictureCarousel
					cloudinary={cloudinary}
					id={listing.id}
					region={listing.region}
					imageComments={listing.imageComments}
				/>
				<ItemDetailsMobile listing={listing} />
			</div>
		</div>
	);
};

export default PriceMarker;
