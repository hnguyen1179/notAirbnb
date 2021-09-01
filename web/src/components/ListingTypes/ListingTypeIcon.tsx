import React from "react";
import { AdvancedImage, placeholder } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/base/assets/CloudinaryImage";

interface Props {
	name: string;
	img: CloudinaryImage;
}

const ListingTypeIcon = ({ name, img }: Props) => {
	return (
		<li className="ListingTypeIcon">
			<a href="" className="ListingTypeIcon__content">
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
