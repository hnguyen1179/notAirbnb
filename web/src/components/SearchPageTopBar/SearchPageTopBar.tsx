import { useState, useEffect } from "react";
import { ReactComponent as BackSvg } from "../../assets/icons/back.svg";
import { ReactComponent as FilterSvg } from "../../assets/icons/filter.svg";
import { ReactComponent as NegativeSvg } from "../../assets/icons/negative.svg";
import { ReactComponent as SearchSvg } from "../../assets/icons/small-search.svg";
import { ReactComponent as CalendarSvg } from "../../assets/icons/calendar.svg";
import { ReactComponent as GuestsSvg } from "../../assets/icons/guests.svg";

import Navbar from "../Navbar/Navbar";

interface Props {
	mobile: boolean;
	region: string;
	searchDetails: string;
	handleBack: () => void;
	handleEditSearch: () => void;
	handleEditFilter: () => void;
}

const SearchPageTopBar = ({
	mobile,
	region,
	searchDetails,
	handleBack,
	handleEditSearch,
	handleEditFilter,
}: Props) => {
	const [edit, setEdit] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", handleCloseEdit);

		return () => {
			window.removeEventListener("scroll", handleCloseEdit);
		};
	}, []);

	const handleOpenEdit = () => {
		setEdit(true);
	};

	const handleCloseEdit = () => {
		setEdit(false);
	};

	const backButtonEvent = edit ? handleCloseEdit : handleBack;
	const backButtonSvg = edit ? <NegativeSvg id="close" /> : <BackSvg />;
	const [dates, guests = "Add guests"] = searchDetails.split(" · ");

	return (
		<>
			{mobile ? (
				<>
					<div className="SearchPage__top-bar">
						<button
							className="button button--back"
							onClick={backButtonEvent}
						>
							{backButtonSvg}
						</button>
						<button
							className="button button--edit-search"
							onClick={handleOpenEdit}
						>
							<div className="region">{region}</div>
							<div className="date">{searchDetails}</div>
						</button>
						<div className="pipe-divider">|</div>
						<button
							className="button button--edit-filter"
							onClick={handleEditFilter}
						>
							<FilterSvg />
						</button>

						<div
							className="SearchPage__top-bar__edit-menu"
							aria-hidden={!edit}
						>
							<div className="upper">
								<h2>Edit your search</h2>
							</div>
							<div className="lower">
								<div>
									<button className="lower__region">
										<div className="item">
											<SearchSvg />
											<span>{region}</span>
										</div>
									</button>
									<div className="lower__date-guests">
										<button className="date">
											<div className="item">
												<CalendarSvg />
												<span>{dates}</span>
											</div>
										</button>
										<button className="guests">
											<div className="item">
												<GuestsSvg />
												<span>{guests}</span>
											</div>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="SearchPage__top-bar--filler" />
				</>
			) : (
				<>
					<Navbar notLanding={true} />
					<div className="Navbar-filler" />
				</>
			)}
		</>
	);
};

export default SearchPageTopBar;
