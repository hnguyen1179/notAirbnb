import React, { useContext, useState } from "react";
import { animated, useSpring, SpringValue, config } from "react-spring";

import { AppContext } from "../../context/AppContext";
import ListingTypeIcon from "./ListingTypeIcon";

import { ReactComponent as LeftArrowSvg } from "../../assets/icons/left-arrow.svg";
import { ReactComponent as RightArrowSvg } from "../../assets/icons/right-arrow.svg";

const types = [
	"Nature getaways",
	"Summer stays",
	"Entire homes",
	"Pets allowed",
];

const ListingTypes = () => {
	const [right, setRight] = useState(false);
	const { cloudinary, mobile } = useContext(AppContext);

	const handleArrowClick = () => {
		setRight(!right);
		console.log("right is currently: ", !right);
		console.log("mobile is currently: ", mobile);
	};

	// TODO: When on mobile, you must have it transformed back to 0%; there's a bug
	// when you click to the end and shrink back into mobile view wherein it's still
	// translatedX @ -33%

	// Transfer back to 0% ?
	// conditions are... if it's translated right && in mobile view
	// if it's translated left and in mobile view; keep at 0%;
	const props = useSpring({
		transform:
			(mobile && right) || !right ? "translateX(0%)" : "translateX(-33%)",
	});

	const showLeft = right ? "show" : "";
	const showRight = right ? "" : "show";

	return (
		<div className="ListingTypes">
			<div className="ListingTypes__header">
				<h3>Live anywhere</h3>
			</div>
			<div className="ListingTypes__container">
				<div
					className={`ListingTypes__container__button ListingTypes__container__button--left ${showLeft}`}
				>
					<button onClick={handleArrowClick}>
						<LeftArrowSvg />
					</button>
				</div>
				<div style={{ overflow: "hidden" }}>
					<animated.ul
						className="ListingTypes__container__list"
						style={props}
					>
						{types.map((type) => {
							const filename =
								"type-" + type.replace(" ", "-").toLowerCase();
							const img = cloudinary.image(`assets/${filename}`);

							return (
								<ListingTypeIcon
									key={type}
									name={type}
									img={img}
								/>
							);
						})}
					</animated.ul>
				</div>
				<div
					className={`ListingTypes__container__button ListingTypes__container__button--right ${showRight}`}
				>
					<button onClick={handleArrowClick}>
						<RightArrowSvg />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ListingTypes;
