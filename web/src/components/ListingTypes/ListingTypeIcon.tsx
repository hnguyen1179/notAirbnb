import React from "react";
import { AdvancedImage, placeholder } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/base/assets/CloudinaryImage";

interface Props {
	name: string;
	img: CloudinaryImage;
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
	}
};

const ListingTypeIcon = ({ name, img }: Props) => {
	return (
		<li className="ListingTypeIcon">
			<a href={renderUrl(name)} className="ListingTypeIcon__content">
				<div className="ListingTypeIcon__content__image">
					<AdvancedImage cldImg={img} />
				</div>
				<div className="ListingTypeIcon__content__text">
					<span>{name}</span>
				</div>
			</a>
		</li>
	);
};

export default ListingTypeIcon;
