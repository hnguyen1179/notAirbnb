import { Cloudinary } from "@cloudinary/base";
import {
	MouseEvent,
	MouseEventHandler,
	RefObject,
	useEffect,
	useRef,
} from "react";
import { Maybe } from "../../generated/graphql";
import ItemDetailsMobile from "../SearchResultsItem/ItemDetailsMobile";
import PictureCarousel from "../SearchResultsItem/PictureCarousel";
import { PartialListing } from "../SearchResultsItem/SearchResultsItem";
import { ChildComponentProps } from "google-map-react";
import { Link } from "react-router-dom";

interface Props extends ChildComponentProps {
	$geoService?: any;
	listing: Maybe<PartialListing>;
	isCurrent: boolean;
	isClicked: boolean;
	handleClickMarker: (e: MouseEvent<HTMLDivElement>) => void;
	mapRef: RefObject<HTMLDivElement>;
	cloudinary: Cloudinary;
	setHover: (state: boolean) => void;
}

const PriceMarker = ({
	$hover,
	$geoService,
	listing,
	isCurrent,
	isClicked,
	handleClickMarker,
	mapRef,
	cloudinary,
	setHover,
}: Props) => {
	const markerRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLDivElement>(null);

	const handleMouseEnter: MouseEventHandler = (e) => {
		e.stopPropagation();
		setHover(false);
	};

	const handleMouseExit: MouseEventHandler = (e) => {
		e.stopPropagation();
		setHover(true);
	};

	if (!listing) return <></>;
	// console.log($geoService.getWidth());
	// console.log(listing.title)
	// console.log("MAP: ", mapRef.current?.getBoundingClientRect().left)
	// console.log("MARKER :", markerRef.current?.getBoundingClientRect().left)

	return (
		<div
			className="PriceMarker"
			aria-selected={isCurrent || isClicked}
			ref={markerRef}
			onClick={handleClickMarker}
		>
			<span>${listing.price}</span>

			<div
				className="PriceMarker__details"
				aria-hidden={!isClicked}
				onMouseEnter={handleMouseEnter}
				onMouseOut={handleMouseExit}
			>
				<Link
					to={`/listing/${listing.id}`}
					target="_blank"
					rel="noreferrer"
				></Link>

				<div className="PriceMarker__details__image" ref={imageRef}>
					{listing.superhost && (
						<div className="superhost">
							<span>superhost</span>
						</div>
					)}
					<PictureCarousel
						cloudinary={cloudinary}
						id={listing.id}
						region={listing.region}
						imageComments={listing.imageComments}
						width={240}
					/>
				</div>
				<ItemDetailsMobile listing={listing} />
			</div>
		</div>
	);
};

export default PriceMarker;
