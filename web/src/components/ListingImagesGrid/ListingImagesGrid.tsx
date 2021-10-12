import { Cloudinary } from "@cloudinary/base";
import { AdvancedImage, placeholder, lazyload } from "@cloudinary/react";
import { Maybe } from "../../generated/graphql";
import { ReactComponent as MoreSvg } from "../../assets/icons/more-photos.svg";

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
				className={"ListingImagesGrid__c1__image"}
				cldImg={cloudinary.image(urlBase + idx)}
				plugins={[placeholder("predominant-color"), lazyload()]}
				alt={imageComments[idx]}
				draggable={false}
			/>
		);
	};

	return (
		<div className="ListingImagesGrid">
			<div className="ListingImagesGrid__main-img">
				{renderAdvancedImage(0)}
			</div>
			<div className="ListingImagesGrid__c1">
				{imageComments.slice(1, 5).map((comment, idx) => {
					const imageIdx = idx + 1;

					return (
						<div className="ListingImagesGrid__c1__image-container">
							{renderAdvancedImage(imageIdx)}
						</div>
					);
				})}
			</div>
			{/* <div className="ListingImagesGrid__c2"></div> */}
			<button className="ListingImagesGrid__more-button">
				<MoreSvg />
				<span>Show all photos</span>
			</button>
		</div>
	);
};

export default ListingImagesGrid;
