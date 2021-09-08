import React from "react";
import { ReactComponent as ProfileSvg } from "../../assets/icons/dark-profile.svg";
import { ReactComponent as HamburgerSvg } from "../../assets/icons/hamburger.svg";

interface Props {
  profile: boolean,
  setProfile: (x: boolean) => void;
  handleOpen: () => void;
}

const Profile = ({ profile, setProfile, handleOpen }: any) => {
	const handleClickProfile = (e: React.SyntheticEvent<EventTarget>) => {
		e.stopPropagation();
		setProfile(!profile);
	};

	const profileActive = profile ? "active" : "";

	return (
		<div className="Navbar__right__profile">
			<button
				className="Navbar__right__profile__button"
				onClick={handleClickProfile}
			>
				<div className="Navbar__right__profile__button__icon Navbar__right__profile__button__icon--hamburger">
					<HamburgerSvg />
				</div>
				<div className="Navbar__right__profile__button__icon Navbar__right__profile__button__icon--profile">
					<ProfileSvg />
				</div>
			</button>
			<div
				className={`Navbar__right__profile__dropdown ${profileActive}`}
				onClick={(e) => e.stopPropagation()}
			>
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
				<div className="divider"></div>
				<button className="Navbar__right__profile__dropdown__link Navbar__right__profile__dropdown__link--inactive">
					<span>Host your home</span>
				</button>
				<button className="Navbar__right__profile__dropdown__link Navbar__right__profile__dropdown__link--inactive">
					<span>Host an experience</span>
				</button>
				<button className="Navbar__right__profile__dropdown__link Navbar__right__profile__dropdown__link--inactive">
					<span>Help</span>
				</button>
			</div>
		</div>
	);
};

export default Profile;
