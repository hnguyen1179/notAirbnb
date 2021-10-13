import { Cloudinary } from "@cloudinary/base";
import { AdvancedImage, placeholder, lazyload } from "@cloudinary/react";
import { Maybe } from "../../generated/graphql";
import { ReactComponent as MoreSvg } from "../../assets/icons/more-photos.svg";
import { useMemo } from "react";

interface Props {
	cloudinary: Cloudinary;
	imageComments: Maybe<string>[];
	region: string;
	id: string;
}

const ListingImagesGrid = (props: Props) => {
	const { cloudinary, region, id, imageComments } = props;

	const urlBase = `images/${region
		.replaceAll(" ", "_")
		.toLowerCase()}/${id}/image-`;

	const renderAdvancedImage = (idx: number) => {
		return (
			<AdvancedImage
				className={"ListingImagesGrid__grid__image"}
				cldImg={cloudinary.image(urlBase + idx)}
				plugins={[placeholder("predominant-color"), lazyload()]}
				alt={imageComments[idx]}
				draggable={false}
			/>
		);
	};

	return useMemo(
		() => (
			<div className="ListingImagesGrid">
				<button className="ListingImagesGrid__main-image-container">
					{renderAdvancedImage(0)}
				</button>
				<div className="ListingImagesGrid__grid">
					{imageComments.slice(1, 5).map((_comment, idx) => {
						const imageIdx = idx + 1;

						return (
							<button
								key={idx}
								className="ListingImagesGrid__grid__image-container"
							>
								{renderAdvancedImage(imageIdx)}
							</button>
						);
					})}
				</div>
				{/* <div className="ListingImagesGrid__c2"></div> */}
				<button className="ListingImagesGrid__more-button">
					<MoreSvg />
					<span>Show all photos</span>
				</button>
			</div>
		),
		[imageComments]
	);
};

export default ListingImagesGrid;
