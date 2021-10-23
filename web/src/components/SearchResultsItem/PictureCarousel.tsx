import { Cloudinary } from "@cloudinary/base";
import { AdvancedImage, placeholder, lazyload } from "@cloudinary/react";
import {
	MouseEventHandler,
	useMemo,
	useState,
} from "react";
import { Maybe } from "../../generated/graphql";
import { ReactComponent as BackSvg } from "../../assets/icons/left-arrow.svg";
import { ReactComponent as ForwardSvg } from "../../assets/icons/right-arrow.svg";

interface Props {
	cloudinary: Cloudinary;
	imageComments: Maybe<string>[];
	region: string;
	id: string;
	width: number;
}

const PictureCarousel = ({
	cloudinary,
	imageComments,
	region,
	id,
	width,
}: Props) => {
	const [index, setIndex] = useState(0);
	const [animationState, setAnimationState] = useState({
		classNames: "",
		transform: 0,
		finished: true,
	});

	const toggleSlideAnimation = (side: string) => {
		setAnimationState({
			...animationState,
			classNames: `${side}-slide`,
		});
	};

	const onAnimationStart = () => {
		setAnimationState({
			...animationState,
			finished: false,
		});
	};

	const onAnimationEnd = () => {
		setAnimationState({
			classNames: "",
			transform: index * -1 * width,
			finished: true,
		});
	};

	const handleLeftClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.stopPropagation();
		setIndex((prev) => prev - 1);
		toggleSlideAnimation("left");
	};

	const handleRightClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.stopPropagation();
		setIndex((prev) => prev + 1);
		toggleSlideAnimation("right");
	};

	const renderImages = useMemo(
		() =>
			imageComments.map((comment, idx) => {
				const url = `images/${region
					.replaceAll(" ", "_")
					.toLowerCase()}/${id}/image-${idx}`;

				return (
					<li key={idx} className="PictureCarousel__slide__image-container">
						<AdvancedImage
							cldImg={cloudinary.image(url)}
							plugins={[
								placeholder("predominant-color"),
								lazyload(),
							]}
							alt={comment}
							draggable={false}
						/>
					</li>
				);
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	return (
		<div className="PictureCarousel">
			<button
				aria-label="Previous"
				className="PictureCarousel__button PictureCarousel__button--left"
				aria-hidden={index === 0}
				disabled={!animationState.finished}
				onClick={handleLeftClick}
			>
				<BackSvg />
			</button>

			<ul
				className={`PictureCarousel__slide ${animationState.classNames}`}
				style={{
					width: imageComments.length * width,
					transform: `translateX(${animationState.transform}px)`,
				}}
				onAnimationStart={onAnimationStart}
				onAnimationEnd={onAnimationEnd}
			>
				{renderImages}
			</ul>

			<button
				aria-label="Next"
				className="PictureCarousel__button PictureCarousel__button--right"
				aria-hidden={index === imageComments.length - 1}
				disabled={!animationState.finished}
				onClick={handleRightClick}
			>
				<ForwardSvg />
			</button>

			<div className="PictureCarousel__dots">
				{imageComments.map((_, idx) => {
					const isActive = idx === index;
					return (
						<span
							key={idx}
							className="PictureCarousel__dots__dot"
							aria-selected={isActive}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default PictureCarousel;
