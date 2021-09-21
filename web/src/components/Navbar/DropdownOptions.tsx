import React from "react";

interface Props {
	handleOpen: (e: React.SyntheticEvent<EventTarget>) => void;
}

const DropdownOptions = ({ handleOpen }: Props) => {
	return (
		<>
			<button
				className="Navbar__right__profile__dropdown__link"
				onClick={handleOpen}
			>
				<div>Log in</div>
			</button>
			<button
				className="Navbar__right__profile__dropdown__link"
				onClick={handleOpen}
			>
				<div>Sign up</div>
			</button>
		</>
	);
};

export default DropdownOptions;
