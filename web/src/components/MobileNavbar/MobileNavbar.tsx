import React, { useContext, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg";
import { ReactComponent as HeartSvg } from "../../assets/icons/heart.svg";
import { ReactComponent as ProfileSvg } from "../../assets/icons/profile.svg";
import { ReactComponent as SpeechSvg } from "../../assets/icons/speech.svg";
import { ReactComponent as LogoSvg } from "../../assets/icons/logo.svg";

const MobileNavbar = React.forwardRef<HTMLElement>((props, ref) => {
	const { user } = useContext(AppContext);
	const mobileNavbarRef = useRef<HTMLElement>(null);

	const handleMobileNav = () => {
		// Manages the bottom nav on mobile
		// Hides bottom nav on scroll to bottom
		const cutoff = document.documentElement.scrollHeight - 10;
		if (
			window.scrollY + window.innerHeight >= cutoff &&
			mobileNavbarRef.current
		) {
			mobileNavbarRef.current?.classList.add("inactive");
		} else {
			mobileNavbarRef.current?.classList.remove("inactive");
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleMobileNav);

		return () => {
			window.removeEventListener("scroll", handleMobileNav);
		};
	}, []);

	return (
		<nav className="MobileNavbar" ref={mobileNavbarRef}>
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
							to={`/trips/${user.id}`}
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
							to={`/user/${user.id}`}
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
