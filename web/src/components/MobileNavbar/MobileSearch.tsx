import React from "react";
import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg";

const MobileSearch = React.forwardRef<HTMLDivElement>((props, ref) => {
	return (
		<div className="Search-container" ref={ref}>
			<div className="Search-container__button">
				<button>
					<div className="Search-container__button__content">
						<SearchSvg />
						<span>Where are you going?</span>
					</div>
				</button>
			</div>
		</div>
	);
});

export default MobileSearch;
