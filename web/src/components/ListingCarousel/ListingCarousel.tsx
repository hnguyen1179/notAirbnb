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

	const handleSlideScroll: EventListener = () => {
		const width = slideRef.current?.offsetWidth || 0;
		const totalWidth = width * imageComments.length;
		const scrollLeft = slideRef.current?.scrollLeft || 0;

		if (scrollLeft % width === 0) {
			const newIdx = (scrollLeft / totalWidth) * imageComments.length;
			setScrollIdx(newIdx + 1);
		}
	};

	useLayoutEffect(() => {
		const element = slideRef?.current;

		if (!element) return;
		element.addEventListener("scroll", handleSlideScroll);

		return () => {
			element.removeEventListener("scroll", handleSlideScroll);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
								cldImg={cloudinary.image(url)}
								plugins={[
									placeholder("predominant-color"),
									lazyload(),
								]}
								alt={comment}
								draggable={false}
							/>
						</div>
					</li>
				);
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
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
