import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg";
import { ReactComponent as HeartSvg } from "../../assets/icons/heart.svg";
import { ReactComponent as ProfileSvg } from "../../assets/icons/profile.svg";
import { ReactComponent as SpeechSvg } from "../../assets/icons/speech.svg";
import { ReactComponent as LogoSvg } from "../../assets/icons/logo.svg";

const MobileNavbar = React.forwardRef<HTMLElement>((props, ref) => {
	const { user } = useContext(AppContext);

	return (
		<nav className="MobileNavbar" ref={ref}>
			<div className="MobileNavbar__links">
				<NavLink
					to="/"
					className="MobileNavbar__links__link"
					activeClassName="active"
					exact
				>
					<div className="MobileNavbar__links__link__content">
						<SearchSvg />
						<span>Explore</span>
					</div>
				</NavLink>
				<NavLink
					to="/filler"
					className="MobileNavbar__links__link MobileNavbar__links__link--inactive"
				>
					<div className="MobileNavbar__links__link__content">
						<HeartSvg />
						<span>Wishlists</span>
					</div>
				</NavLink>

				{user ? (
					<>
						<NavLink
							to="/filler"
							className="MobileNavbar__links__link"
							activeClassName="active"
						>
							<div className="MobileNavbar__links__link__content">
								<LogoSvg />
								<span>Trips</span>
							</div>
						</NavLink>
						<NavLink
							to="/filler"
							className="MobileNavbar__links__link MobileNavbar__links__link--inactive"
						>
							<div className="MobileNavbar__links__link__content">
								<SpeechSvg />
								<span>Messages</span>
							</div>
						</NavLink>
						<NavLink
							to={`users/${user.id}`}
							className="MobileNavbar__links__link"
							activeClassName="active"
						>
							<div className="MobileNavbar__links__link__content">
								<ProfileSvg />
								<span>Profile</span>
							</div>
						</NavLink>
					</>
				) : (
					<NavLink
						to="/entry"
						className="MobileNavbar__links__link"
						activeClassName="active"
					>
						<div className="MobileNavbar__links__link__content">
							<ProfileSvg />
							<span>Log In</span>
						</div>
					</NavLink>
				)}
			</div>
		</nav>
	);
});

export default MobileNavbar;
