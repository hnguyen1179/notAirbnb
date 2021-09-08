import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg";
import { ReactComponent as HeartSvg } from "../../assets/icons/heart.svg";
import { ReactComponent as ProfileSvg } from "../../assets/icons/profile.svg";

const MobileNavbar = React.forwardRef<HTMLElement>((props, ref) => {
	return (
		<nav className="MobileNavbar" ref={ref}>
			<div className="MobileNavbar__links">
				<NavLink
					to="/"
					className="MobileNavbar__links__link"
					activeClassName="active"
				>
					<div className="MobileNavbar__links__link__content">
						<SearchSvg />
						<span>Explore</span>
					</div>
				</NavLink>
				<NavLink
					to="/filler"
					className="MobileNavbar__links__link"
					activeClassName="active"
				>
					<div className="MobileNavbar__links__link__content">
						<HeartSvg />
						<span>Wishlists</span>
					</div>
				</NavLink>
				<NavLink
					to="/filler"
					className="MobileNavbar__links__link"
					activeClassName="active"
				>
					<div className="MobileNavbar__links__link__content">
						<ProfileSvg />
						<span>Log In</span>
					</div>
				</NavLink>
			</div>
		</nav>
	);
});

export default MobileNavbar;
