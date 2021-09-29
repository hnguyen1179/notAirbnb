import { useEffect, useRef } from "react";

import { ReactComponent as BackSvg } from "../../assets/icons/back.svg";
import { ReactComponent as FilterSvg } from "../../assets/icons/filter.svg";
import { ReactComponent as NegativeSvg } from "../../assets/icons/negative.svg";

import Navbar from "../Navbar/Navbar";

import { CSSTransition } from "react-transition-group";
import SearchPageTopBarDropdown from "./SearchPageTopBarDropdown";
import EditMenuPortal from "./EditMenuPortal";

import { useURLParams } from "../../context/URLParamsContext";

interface Props {
	mobile: boolean;
	searchDetails: string;
	handleBack: () => void;
}

const SearchPageTopBar = ({ mobile, searchDetails, handleBack }: Props) => {
	const { state, handleCloseEdit, handleOpenEdit, handleOpenEditMenu } =
		useURLParams();
	// For use with CSSTransition; ref based (React way)
	const menuRef = useRef<HTMLDivElement>(null);

	// Close top bar on scroll
	useEffect(() => {
		window.addEventListener("scroll", handleCloseEdit);
		return () => {
			window.removeEventListener("scroll", handleCloseEdit);
		};
	}, [handleCloseEdit]);
	// Remove handleCloseEdit if bugging?

	const backButtonEvent = state.edit ? handleCloseEdit : handleBack;
	const backButtonSvg = state.edit ? <NegativeSvg id="close" /> : <BackSvg />;
	const [searchDates, searchGuests = "Add guests"] =
		searchDetails.split(" · ");
	console.log("STATE: ", state);
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
							<div className="region">
								{state.location ? state.location : "Nearby"}
							</div>
							<div className="date">{searchDetails}</div>
						</button>
						<button
							className="button button--edit-filter"
							onClick={() => handleOpenEditMenu("filters")}
						>
							<FilterSvg />
						</button>

						<SearchPageTopBarDropdown
							handleOpenEditMenu={handleOpenEditMenu}
							region={state.location}
							searchDates={searchDates}
							searchGuests={searchGuests}
							edit={state.edit}
						/>
					</div>

					<CSSTransition
						in={Object.values(state.editMenu).some(
							(field) => field === true
						)}
						timeout={300}
						unmountOnExit
						classNames="edit-menu__menu"
						nodeRef={menuRef}
					>
						<EditMenuPortal menuRef={menuRef} />
					</CSSTransition>

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
