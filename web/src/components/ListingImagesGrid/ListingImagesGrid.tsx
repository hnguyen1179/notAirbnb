import { Cloudinary } from "@cloudinary/base";
import { AdvancedImage, placeholder, lazyload } from "@cloudinary/react";
import { Maybe } from "../../generated/graphql";
import { ReactComponent as MoreSvg } from "../../assets/icons/more-photos.svg";
import { MouseEvent, useMemo, useState } from "react";
import { usePortal } from "../../hooks/usePortal";
import ListingShowImages from "../ListingShowImages/ListingShowImages";

interface Props {
	cloudinary: Cloudinary;
	imageComments: Maybe<string>[];
	region: string;
	id: string;
}

const ListingImagesGrid = (props: Props) => {
	const { cloudinary, region, id, imageComments } = props;
	const { Portal, portalProps, openPortal, closePortal } = usePortal();
	const [image, setImage] = useState(0);

	const urlBase = `images/${region
		.replaceAll(" ", "_")
		.toLowerCase()}/${id}/image-`;

	const handleOpenShowAll = (
		e: MouseEvent<HTMLButtonElement>,
		idx: number = 0
	) => {
		window.scrollTo({ top: 0 });
		setImage(idx);
		openPortal(e);
	};

	const renderAdvancedImage = (idx: number) => {
		return (
			<AdvancedImage
				alt={imageComments[idx] || `Host submitted image: ${idx}`}
				className={"ListingImagesGrid__grid__image"}
				cldImg={cloudinary.image(urlBase + idx)}
				plugins={[placeholder("predominant-color"), lazyload()]}
				draggable={false}
			/>
		);
	};

	const renderGrid = useMemo(
		() => (
			<>
				<button
					aria-label="Show All Button"
					className="ListingImagesGrid__main-image-container"
					onClick={handleOpenShowAll}
				>
					{renderAdvancedImage(0)}
				</button>
				<div className="ListingImagesGrid__grid">
					{imageComments.slice(1, 5).map((_comment, idx) => {
						const imageIdx = idx + 1;

						return (
							<button
								aria-label="Show All Button"
								key={idx}
								className="ListingImagesGrid__grid__image-container"
								onClick={(e) => handleOpenShowAll(e, imageIdx)}
							>
								{renderAdvancedImage(imageIdx)}
							</button>
						);
					})}
				</div>
			</>
		),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const style = {
		from: { opacity: 0, transform: "translateY(50vh)" },
		to: {
			opacity: 1,
			transform: "translateY(0vh)",
		},
	};

	return (
		<div className="ListingImagesGrid">
			{renderGrid}
			<button
				className="ListingImagesGrid__more-button"
				onClick={handleOpenShowAll}
			>
				<MoreSvg />
				<span>Show all photos</span>
			</button>

			<Portal
				{...portalProps}
				style={style}
				configType={"default"}
				enableBackground={false}
			>
				<ListingShowImages
					image={image}
					cloudinary={props.cloudinary}
					closePortal={closePortal}
					imageComments={props.imageComments}
					urlBase={urlBase}
				/>
			</Portal>
		</div>
	);
};

export default ListingImagesGrid;
