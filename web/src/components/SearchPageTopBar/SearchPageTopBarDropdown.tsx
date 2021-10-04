import React from "react";
import { ReactComponent as SearchSvg } from "../../assets/icons/small-search.svg";
import { ReactComponent as CalendarSvg } from "../../assets/icons/calendar.svg";
import { ReactComponent as GuestsSvg } from "../../assets/icons/guests.svg";

interface Props {
	handleOpenEditMenu: (field: "location" | "dates" | "guests") => void;
	region: string;
	searchDates: string;
	searchGuests: string;
	edit: boolean;
}

const SearchPageTopBarDropdown = ({
	handleOpenEditMenu,
	region,
	searchDates,
	searchGuests,
	edit,
}: Props) => {
	return (
		<div className="SearchPage__top-bar__edit-dropdown" aria-hidden={!edit}>
			<div className="upper">
				<h2>Edit your search</h2>
			</div>
			<div className="lower">
				<div>
					<button
						className="lower__region"
						onClick={() => handleOpenEditMenu("location")}
					>
						<div className="item">
							<SearchSvg />
							<span>{region ? region : "Nearby"}</span>
						</div>
					</button>
					<div className="lower__date-guests">
						<button
							className="date"
							onClick={() => handleOpenEditMenu("dates")}
						>
							<div className="item">
								<CalendarSvg />
								<span>{searchDates}</span>
							</div>
						</button>
						<button
							className="guests"
							onClick={() => handleOpenEditMenu("guests")}
						>
							<div className="item">
								<GuestsSvg />
								<span>{searchGuests}</span>
							</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchPageTopBarDropdown;
