import { useContext, useState } from "react";
import { animated, useSpring } from "react-spring";

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
	};

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
