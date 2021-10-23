import { SyntheticEvent, useMemo } from "react";
import { ReactComponent as ProfileSvg } from "../../assets/icons/dark-profile.svg";
import { ReactComponent as HamburgerSvg } from "../../assets/icons/hamburger.svg";
import { useAppState } from "../../context/AppContext";
import DropdownOptions from "./DropdownOptions";
import DropdownOptionsUser from "./DropdownOptionsUser";
import useLogout from "../../hooks/useLogout";

import { AdvancedImage, placeholder } from "@cloudinary/react";
import { useHistory, useLocation } from "react-router";

interface Props {
	dropdown: boolean;
	setDropdown: (x: boolean) => void;
	handleOpen: (e: SyntheticEvent<EventTarget>) => void;
}

const Dropdown = ({ dropdown, setDropdown, handleOpen }: Props) => {
	const { cloudinary, user } = useAppState();
	const location = useLocation();
	const history = useHistory();
	const logout = useLogout();

	const handleClickDropdown = (e: SyntheticEvent<EventTarget>) => {
		e.stopPropagation();
		setDropdown(!dropdown);
	};

	const handleLogOut = async () => {
		setDropdown(false);

		if (user && location.pathname.includes(user?.id)) {
			await logout();
			history.push("/");
		} else {
			await logout();
		}
	};

	const renderAvatar = useMemo(() => {
		return user ? (
			<AdvancedImage
				style={{ width: "50px" }}
				cldImg={cloudinary.image(`user_avatars/${user.id}`)}
				plugins={[placeholder("predominant-color")]}
			/>
		) : (
			<ProfileSvg />
		);
	}, [cloudinary, user]);

	const dropdownActive = dropdown ? "active" : "";

	return (
		<div className="Navbar__right__profile">
			<button
				aria-label="Profile Dropdown Button"
				className="Navbar__right__profile__button"
				onClick={handleClickDropdown}
			>
				<div className="Navbar__right__profile__button__icon Navbar__right__profile__button__icon--hamburger">
					<HamburgerSvg />
				</div>
				<div className="Navbar__right__profile__button__icon Navbar__right__profile__button__icon--profile">
					{renderAvatar}
				</div>
			</button>

			<div
				className={`Navbar__right__profile__dropdown ${dropdownActive}`}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Display these conditionally on the presence of a 'user' */}
				{user ? (
					<DropdownOptionsUser user={user} />
				) : (
					<DropdownOptions handleOpen={handleOpen} />
				)}

				{/* These are just placeholders */}
				<div className="navbar-divider"></div>
				<button className="Navbar__right__profile__dropdown__link Navbar__right__profile__dropdown__link--inactive">
					<span>Host your home</span>
				</button>
				<button className="Navbar__right__profile__dropdown__link Navbar__right__profile__dropdown__link--inactive">
					<span>Host an experience</span>
				</button>

				{user && <div className="navbar-divider"></div>}

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

export default Dropdown;
