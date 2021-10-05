import React from "react";
import { AdvancedImage, placeholder } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/base/assets/CloudinaryImage";
import { Link } from "react-router-dom";

interface ILocation {
	name: string;
	distance: string;
}

interface Props {
	location: ILocation;
	img: CloudinaryImage;
}

const DestinationIcon = ({ location, img }: Props) => {
	return (
		<li className="DestinationIcon">
			<Link
				className="DestinationIcon__content"
				to={`/search?region=${location.name.replaceAll(
					" ",
					"+"
				)}&page=1`}
			>
				<div className="DestinationIcon__content__image">
					<AdvancedImage
						cldImg={img}
						plugsin={[placeholder("predominant-color")]}
					/>
				</div>
				<div className="DestinationIcon__content__text">
					<span className="DestinationIcon__content__text__location">
						{location.name}
					</span>
					<span className="DestinationIcon__content__text__distance">
						{location.distance}
					</span>
				</div>
			</Link>
		</li>
	);
};

export default DestinationIcon;
