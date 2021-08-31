import React from "react";
import { ReactComponent as SearchSvg } from "../../assets/svgs/search.svg";

const Search = () => {
	return (
		<div className="Search-container">
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
};

export default Search;
