import { MouseEvent } from "react";
import { ReactComponent as BackSvg } from "../../assets/icons/back.svg";

interface Props {
	handleBack: (e: MouseEvent<HTMLButtonElement>) => void;
}

const ListingMobileNav = ({ handleBack }: Props) => {
	return (
		<nav className="ListingMobileNav">
			<button onClick={handleBack}>
				<BackSvg />
				<span>Homes · Airbnb</span>
			</button>
		</nav>
	);
};

export default ListingMobileNav;