import { Ref } from "react";
import { OnDateRangeChangeProps } from "react-date-range";
import { createPortal } from "react-dom";
import { IDate } from "../MobileNavbar/MobileSearchForm";

import MobileEditDates from "../MobileNavbar/MobileEditDates";
import MobileEditGuests from "../MobileNavbar/MobileEditGuests";
import MobileEditLocation from "../MobileNavbar/MobileEditLocation";
import TagsEditMenu from "./TagsEditMenu";

interface Props {
	editMenu: { [key: string]: boolean };
	menuRef: Ref<HTMLDivElement>;
	handleCloseEditMenu: () => void;
	location: string;
	setLocation: (location: string) => void;
	dates: IDate;
	handleDateChange: (dates: OnDateRangeChangeProps) => void;
	handleSubmitDateEdit: () => void;
	guests: number;
	setGuests: (guests: number) => void;
	handleSubmitGuestsEdit: () => void;
	edit: boolean;
}

const EditMenuPortal = ({
	editMenu,
	menuRef,
	handleCloseEditMenu,
	location,
	setLocation,
	dates,
	handleDateChange,
	handleSubmitDateEdit,
	guests,
	setGuests,
	handleSubmitGuestsEdit,
	edit,
}: Props) => {
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
							setLocation={setLocation}
						/>
					)}
					{editMenu.dates && (
						<MobileEditDates
							handleCloseForm={handleCloseEditMenu}
							dates={dates}
							handleDateChange={handleDateChange}
							submitEdit={handleSubmitDateEdit}
							edit={edit}
						/>
					)}
					{editMenu.guests && (
						<MobileEditGuests
							handleCloseForm={handleCloseEditMenu}
							location={location}
							dates={dates}
							guests={guests}
							setGuests={setGuests}
							submitEdit={handleSubmitGuestsEdit}
						/>
					)}
					{editMenu.tags && (
						<TagsEditMenu handleCloseForm={handleCloseEditMenu} />
					)}
				</div>,
				document?.querySelector("#root") as Element
			)}
		</>
	);
};

export default EditMenuPortal;
