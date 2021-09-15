import React, { useContext } from "react";
import { ReactComponent as ProfileSvg } from "../../assets/icons/dark-profile.svg";
import { ReactComponent as HamburgerSvg } from "../../assets/icons/hamburger.svg";
import { AppContext } from "../../context/AppContext";
import ProfileOptions from "./ProfileOptions";
import UserProfileOptions from "./UserProfileOptions";
import useLogout from "../../hooks/useLogout";

import { AdvancedImage, placeholder } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/base";

interface Props {
	profile: boolean;
	setProfile: (x: boolean) => void;
	handleOpen: (e: React.SyntheticEvent<EventTarget>) => void;
}

const Profile = ({ profile, setProfile, handleOpen }: Props) => {
	const logout = useLogout();
	const { cloudinary, user } = useContext(AppContext);

	const handleClickProfile = (e: React.SyntheticEvent<EventTarget>) => {
		e.stopPropagation();
		setProfile(!profile);
	};

	const handleLogOut = async () => {
		await logout();
		setProfile(false);
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
					{user ? (
						<AdvancedImage
							style={{ width: "50px" }}
							cldImg={cloudinary.image(`user_avatars/${user.id}`)}
						/>
					) : (
						<ProfileSvg />
					)}
				</div>
			</button>

			<div
				className={`Navbar__right__profile__dropdown ${profileActive}`}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Display these conditionally on the presence of a 'user' */}
				{user ? (
					<UserProfileOptions user={user} />
				) : (
					<ProfileOptions handleOpen={handleOpen} />
				)}

				{/* These are just placeholders */}
				<div className="divider"></div>
				<button className="Navbar__right__profile__dropdown__link Navbar__right__profile__dropdown__link--inactive">
					<span>Host your home</span>
				</button>
				<button className="Navbar__right__profile__dropdown__link Navbar__right__profile__dropdown__link--inactive">
					<span>Host an experience</span>
				</button>

				{user && <div className="divider"></div>}

				<button className="Navbar__right__profile__dropdown__link Navbar__right__profile__dropdown__link--inactive">
					<span>Help</span>
				</button>

				{user && (
					<button
						className="Navbar__right__profile__dropdown__link"
						onClick={handleLogOut}
					>
						<span>Log out</span>
					</button>
				)}
			</div>
		</div>
	);
};

export default Profile;
