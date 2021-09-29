import { Ref } from "react";
import { createPortal } from "react-dom";

import MobileEditDates from "../MobileNavbar/MobileEditDates";
import MobileEditGuests from "../MobileNavbar/MobileEditGuests";
import MobileEditLocation from "../MobileNavbar/MobileEditLocation";
import FiltersEditMenu from "./FiltersEditMenu";
import { useURLParams } from "../../context/URLParamsContext";

interface Props {
	menuRef: Ref<HTMLDivElement>;
}

const EditMenuPortal = ({ menuRef }: Props) => {
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
					{editMenu.filters && (
						<FiltersEditMenu
							handleCloseForm={handleCloseEditMenu}
						/>
					)}
				</div>,
				document?.querySelector("#root") as Element
			)}
		</>
	);
};

export default EditMenuPortal;
