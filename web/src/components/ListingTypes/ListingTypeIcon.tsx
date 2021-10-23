import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/base/assets/CloudinaryImage";
import { Link } from "react-router-dom";

interface Props {
	name: string;
	img: CloudinaryImage;
	alt: string;
}

const searchTerms: { [key: string]: string } = {
	"Nature getaways": "Nature",
	"Summer stays": "Summer",
};

const listingTypes: { [key: string]: string } = {
	"Entire homes": "Entire residential home",
};

const pets: { [key: string]: string } = {
	"Pets allowed": "Pets",
};

const renderUrl = (name: string) => {
	if (name in searchTerms) {
		return `/search?tags=${searchTerms[name]}&page=1`;
	} else if (name in listingTypes) {
		return `/search?listingType=${listingTypes[name]}&page=1`;
	} else if (name in pets) {
		return `/search?pets=true&page=1`;
	} else {
		return "/";
	}
};

const ListingTypeIcon = ({ name, img, alt }: Props) => {
	return (
		<li className="ListingTypeIcon">
			<Link to={renderUrl(name)} className="ListingTypeIcon__content">
				<div className="ListingTypeIcon__content__image">
					<AdvancedImage alt={alt} cldImg={img} />
				</div>
				<div className="ListingTypeIcon__content__text">
					<span>{name}</span>
				</div>
			</Link>
		</li>
	);
};

export default ListingTypeIcon;
