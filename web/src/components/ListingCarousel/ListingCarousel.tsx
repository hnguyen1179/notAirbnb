import { Cloudinary } from "@cloudinary/base";
import { AdvancedImage, placeholder, lazyload } from "@cloudinary/react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Maybe } from "../../generated/graphql";

interface Props {
	cloudinary: Cloudinary;
	imageComments: Maybe<string>[];
	region: string;
	id: string;
}

const ListingCarousel = (props: Props) => {
	const [scrollIdx, setScrollIdx] = useState(1);
	const slideRef = useRef<HTMLUListElement>(null);
	const { cloudinary, imageComments, region, id } = props;

	useLayoutEffect(() => {
		const handleSlideScroll: EventListener = () => {
			const width = slideRef.current?.offsetWidth || 0;
			const totalWidth = width * imageComments.length;
			const scrollLeft = slideRef.current?.scrollLeft || 0;

			if (scrollLeft % width === 0) {
				const newIdx = (scrollLeft / totalWidth) * imageComments.length;
				setScrollIdx(newIdx + 1);
			}
		};
		const element = slideRef?.current;

		if (!element) return;
		element.addEventListener("scroll", handleSlideScroll);

		return () => {
			element.removeEventListener("scroll", handleSlideScroll);
		};
	}, [imageComments.length]);

	const renderImages = useMemo(
		() =>
			imageComments.map((comment, idx) => {
				const url = `images/${region
					.replaceAll(" ", "_")
					.toLowerCase()}/${id}/image-${idx}`;

				return (
					<li
						className="ListingCarousel__slide__image-container"
						key={idx}
					>
						<div>
							<AdvancedImage
								alt={comment || `Host submitted image: ${idx}`}
								cldImg={cloudinary.image(url)}
								plugins={[
									placeholder("predominant-color"),
									lazyload(),
								]}
								draggable={false}
								loading="lazy"
							/>
						</div>
					</li>
				);
			}),
		[cloudinary, id, imageComments, region]
	);

	return (
		<div className="ListingCarousel">
			<ul className="ListingCarousel__slide" ref={slideRef}>
				{renderImages}
			</ul>
			<span>
				{scrollIdx} / {imageComments.length}
			</span>
		</div>
	);
};

export default ListingCarousel;
