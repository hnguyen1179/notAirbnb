import React, { useState } from "react";
import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg";
import MobileSearchForm from "./MobileSearchForm";

const MobileSearch = React.forwardRef<HTMLDivElement>((props, ref) => {
	const [showForm, setShowForm] = useState(false);

	const handleFormOpen = (e: React.SyntheticEvent) => {
		setShowForm(true);
		document.body.style.overflow = "hidden";
	};

	const handleFormClose = (e: React.SyntheticEvent) => {
		setShowForm(false);
		document.body.style.overflow = "initial";
	};

	return (
		<div className="Search-container" ref={ref} onClick={handleFormOpen}>
			<div className="Search-container__button">
				<button>
					<div className="Search-container__button__content">
						<SearchSvg />
						<span>Select a location</span>
					</div>
				</button>
			</div>

			{showForm && (
				<div
					className="Search-container__outer"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="Search-container__outer__form">
						<MobileSearchForm handleFormClose={handleFormClose} />
					</div>
				</div>
			)}
		</div>
	);
});

export default MobileSearch;
