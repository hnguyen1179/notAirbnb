import { Ref, useEffect } from "react";
import { createPortal } from "react-dom";

import MobileEditDates from "../MobileNavbar/MobileEditDates";
import MobileEditGuests from "../MobileNavbar/MobileEditGuests";
import MobileEditLocation from "../MobileNavbar/MobileEditLocation";
import FiltersEditMenu from "./FiltersEditMenu";
import { useURLParams } from "../../context/URLParamsContext";
import Fade from "../Fade";

interface Props {
	menuRef?: Ref<HTMLDivElement>;
	onlyFilters?: boolean;
}

const EditMenuPortal = ({ menuRef, onlyFilters }: Props) => {	
	const {
		state: { edit, editMenu, location, dates, guests },
		handleCloseEditMenu,
		searchHandlers: {
			handleLocationChange,
			handleDateChange,
			handleGuestChange,
		},
		submitNewQuery,
	} = useURLParams();

	useEffect(() => {
		return () => {
			handleCloseEditMenu();
		};
	}, []);

	return (
		<>
			{createPortal(
				<div
					className="edit-menu"
					aria-hidden={Object.values(editMenu).every(
						(field) => !field
					)}
					ref={menuRef}
				>
					{editMenu.location && (
						<MobileEditLocation
							handleFormClose={handleCloseEditMenu}
							location={location}
							setLocation={handleLocationChange}
							submitEdit={submitNewQuery}
						/>
					)}
					{editMenu.dates && (
						<MobileEditDates
							handleCloseForm={handleCloseEditMenu}
							dates={dates}
							handleDateChange={handleDateChange}
							submitEdit={submitNewQuery}
							edit={edit}
						/>
					)}
					{editMenu.guests && (
						<MobileEditGuests
							handleCloseForm={handleCloseEditMenu}
							location={location}
							dates={dates}
							guests={guests}
							setGuests={handleGuestChange}
							submitEdit={submitNewQuery}
						/>
					)}
					{onlyFilters ? (
						<Fade>
							<FiltersEditMenu />
						</Fade>
					) : (
						editMenu.filters && <FiltersEditMenu />
					)}
				</div>,
				document?.querySelector("#root") as Element
			)}
		</>
	);
};

export default EditMenuPortal;
