import React, { useEffect, useContext, useState, useRef } from "react";
import Modal from "@material-ui/core/Modal";
import { CSSTransition } from "react-transition-group";

import { useModal } from "../../context/ModalContext";
import { AppContext } from "../../context/AppContext";
import useLogout from "../../hooks/useLogout";

import Entry from "../Entry/Entry";
import Fade from "../Fade";
import { ReactComponent as LogoSvg } from "../../assets/icons/logo.svg";
import { ReactComponent as LogoNameSvg } from "../../assets/icons/logo-with-name.svg";
import { ReactComponent as GlobeSvg } from "../../assets/icons/globe.svg";

import { ReactComponent as SearchSvg } from "../../assets/icons/thick-search.svg";
import Profile from "./Profile";
import SearchForm from "./SearchForm";

interface Props {
	isTop: boolean;
}

// This Navbar is for desktop view; contains a search
function Navbar({ isTop }: Props) {
	const componentRef = useRef(null);
	const buttonRef = useRef(null);
	const [profile, setProfile] = useState(false);
	const [search, setSearch] = useState(false);
	const { user } = useContext(AppContext);

	// Good react pattern in useModal; incorporate hooks within Context APIs that check for undefined
	const { open, setOpen, setEntry } = useModal();

	const handleLogout = useLogout();

	// Opens modal; closes profile and search components
	const handleOpen = (e: React.SyntheticEvent<EventTarget>) => {
		e.stopPropagation();
		setEntry("unverified");
		setSearch(false);
		setProfile(false);
		setOpen(true);
	};

	// Closes modal
	const handleClose = () => {
		setOpen(false);
	};

	// Opens search component
	const handleClickSearch = (e: React.SyntheticEvent<EventTarget>) => {
		e.stopPropagation();
		setProfile(false);
		setSearch(true);
	};

	// Closes profile and search component on document body click
	const handleBodyClick = () => {
		const closeNavigation = new Event("closeNavigation");
		window.dispatchEvent(closeNavigation);
	};

	// Clicking on the body while search or profile is opened will close either
	const handleCloseNavigation = () => {
		setSearch(false);
		setProfile(false);
	};

	// Activates the Search component if at the very top of screen
	useEffect(() => {
		if (isTop) {
			setSearch(true);
		} else {
			setSearch(false);
		}
	}, [isTop]);

	// Creates event listeners to click out of profile and search components
	useEffect(() => {
		window.addEventListener("closeNavigation", handleCloseNavigation);
		document.body.addEventListener("click", handleBodyClick);

		return () => {
			window.removeEventListener(
				"closeNavigation",
				handleCloseNavigation
			);
			document.body.removeEventListener("click", handleBodyClick);
		};
	}, []);

	const active = search ? "active" : "";
	const transparent = isTop ? "transparent" : "";

	return (
		<nav className={`Navbar ${active} ${transparent}`}>
			<div
				className="Navbar__left"
				onClick={(e) => {
					setProfile(false);
					e.stopPropagation();
				}}
			>
				<div className="Navbar__left__logo">
					<a href="/">
						<LogoNameSvg className="logo-name" />
						<LogoSvg className="logo" />
					</a>
				</div>
			</div>
			<div className="Navbar__search">
				<CSSTransition
					in={search || isTop}
					timeout={150}
					unmountOnExit
					classNames="component"
					nodeRef={componentRef}
				>
					<div
						className="Navbar__search__component"
						ref={componentRef}
					>
						<div className="Navbar__search__component__categories">
							<span>Places to stay</span>
							<span>Experiences</span>
							<span>Online Experiences</span>
						</div>
						<SearchForm />
						<SearchSvg />
					</div>
				</CSSTransition>
				<CSSTransition
					in={!search && !isTop}
					timeout={150}
					unmountOnExit
					classNames="button"
					nodeRef={buttonRef}
				>
					<button
						className="Navbar__search__button"
						ref={buttonRef}
						onClick={handleClickSearch}
					>
						<div>Start your search</div>
						<SearchSvg />
					</button>
				</CSSTransition>
			</div>
			<div className="Navbar__right">
				<div className="Navbar__right__host">
					<span>Become a host</span>
				</div>
				<div className="Navbar__right__globe">
					<button>
						<GlobeSvg />
					</button>
				</div>
				<Profile
					profile={profile}
					setProfile={setProfile}
					handleOpen={handleOpen}
				/>
			</div>

			{/* Modal for the entry form */}
			<Modal open={open} onClose={handleClose}>
				<Fade in={open}>
					<div className="Modal-container">
						<Entry />
					</div>
				</Fade>
			</Modal>
			{user ? <button onClick={handleLogout}>logout</button> : ""}

			<div className="background"></div>
		</nav>
	);
}

export default Navbar;
