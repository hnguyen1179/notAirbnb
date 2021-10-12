import { Cloudinary } from "@cloudinary/base";
import { AdvancedImage, placeholder, lazyload } from "@cloudinary/react";
import { Maybe } from "../../generated/graphql";

interface Props {
	cloudinary: Cloudinary;
	imageComments: Maybe<string>[];
	region: string;
	id: string;
}

const ListingImagesGrid = (props: Props) => {
	const { cloudinary, region, id, imageComments } = props;

	// const url = `images/${region
	// 	.replaceAll(" ", "_")
	// 	.toLowerCase()}/${id}/image-${idx}`;

	return (
		<div className="ListingImagesGrid">
			<div className="ListingImagesGrid__main-img">
				<AdvancedImage
					cldImg={cloudinary.image(
						`images/${region
							.replaceAll(" ", "_")
							.toLowerCase()}/${id}/image-0`
					)}
					plugins={[placeholder("predominant-color"), lazyload()]}
					alt={imageComments[0]}
					draggable={false}
				/>
			</div>
			<div className="ListingImagesGrid__c1">

			</div>
			<div className="ListingImagesGrid__c2"></div>
		</div>
	);
};

export default ListingImagesGrid;
