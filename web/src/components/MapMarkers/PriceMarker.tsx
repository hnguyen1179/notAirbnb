import { Cloudinary } from "@cloudinary/base";
import {
	MouseEvent,
	MouseEventHandler,
	RefObject,
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
}: Props) => {
	const markerRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLDivElement>(null);

	const handleMouseEnter: MouseEventHandler = (e) => {
		e.stopPropagation();
	};

	const handleMouseExit: MouseEventHandler = (e) => {
		e.stopPropagation();
	};

	if (!listing) return <></>;

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
