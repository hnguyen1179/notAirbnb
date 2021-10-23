import { Maybe } from "../../generated/graphql";
import { ReactComponent as BackSvg } from "../../assets/icons/back.svg";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/base";
import { useRef } from "react";
import { useLayoutEffect } from "@react-spring/shared";

interface Props {
	image: number;
	cloudinary: Cloudinary;
	closePortal: () => void;
	imageComments: Maybe<string>[];
	urlBase: string;
}

const ListingShowImages = (props: Props) => {
	const imagesRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (imagesRef.current) {
			imagesRef.current.scrollTop =
				props.image * (window.innerHeight * 0.9);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imagesRef.current]);

	return (
		<div className="ListingShowImages">
			<nav className="ListingShowImages__nav">
				<button aria-label="Back Button" onClick={props.closePortal}>
					<BackSvg />
				</button>
			</nav>
			<div className="ListingShowImages__images" ref={imagesRef}>
				<div className="ListingShowImages__images-container">
					{props.imageComments.map((comment, idx) => {
						return (
							<div
								key={idx}
								className="ListingShowImages__images__image"
							>
								<AdvancedImage
									cldImg={props.cloudinary.image(
										props.urlBase + idx
									)}
									alt={comment}
									draggable={false}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ListingShowImages;
