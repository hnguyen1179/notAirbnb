import React from "react";

interface Props {
	handleOpen: (e: React.SyntheticEvent<EventTarget>) => void;
}

const ProfileOptions = ({ handleOpen }: Props) => {
	return (
		<>
			<button
				className="Navbar__right__profile__dropdown__link"
				onClick={handleOpen}
			>
				<span>Log in</span>
			</button>
			<button
				className="Navbar__right__profile__dropdown__link"
				onClick={handleOpen}
			>
				<span>Sign up</span>
			</button>
		</>
	);
};

export default ProfileOptions;
