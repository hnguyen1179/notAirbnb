import React, { useEffect, useState, useRef } from "react";
import Modal from "@material-ui/core/Modal";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { useModal } from "../../context/ModalContext";

import Entry from "../Entry/Entry";
import Fade from "../Fade";
import { ReactComponent as LogoSvg } from "../../assets/icons/logo.svg";
import { ReactComponent as LogoNameSvg } from "../../assets/icons/logo-with-name.svg";
import { ReactComponent as GlobeSvg } from "../../assets/icons/globe.svg";

import { ReactComponent as SearchSvg } from "../../assets/icons/thick-search.svg";
import Profile from "./Profile";
import SearchForm from "./SearchForm";

interface Props {
	isTop?: boolean; // Denotes whether or not Navbar is at the top of page or not; used in Landing
	notLanding?: boolean; // Denotes whether or not Navbar is used on LandingPage or not
	disableEntry?: boolean; // Prevent login and signup modal from appearing
}

// This Navbar is for desktop view; contains a search
function Navbar({ isTop, notLanding = false, disableEntry = false }: Props) {
	const componentRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);
	const [profile, setProfile] = useState(false);
	const [search, setSearch] = useState(false);

	// Good react pattern in useModal; incorporate hooks within Context APIs that check for undefined
	const { open, setOpen, setEntry } = useModal();

	// Opens modal; closes profile and search components
	const handleOpen = (e: React.SyntheticEvent<EventTarget>) => {
		e.stopPropagation();
		if (disableEntry) {
			setProfile(false);
			return;
		}

		document.body.style.overflow = "hidden";
		setEntry("unverified");
		setSearch(false);
		setProfile(false);
		setOpen(true);
	};

	// Closes modal
	const handleClose = () => {
		document.body.style.overflow = "initial";
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

	// Activates the Search component if at the very t op of screen
	useEffect(() => {
		if (notLanding) {
			return;
		}

		console.log(" in here ");
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
			handleClose();
		};
	}, []);

	const active = search ? "active" : "";
	const transparent = isTop ? "transparent" : "";

	return (
		<nav className={`Navbar ${active} ${transparent}`}>
			<div
				className="Navbar__container"
				onClick={(e) => e.stopPropagation()}
			>
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
				{!notLanding && (
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
				)}

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
				<Modal open={open} onClose={handleClose} disableScrollLock>
					<TransitionGroup>
						<Fade in={open} ref={modalRef}>
							<div className="Modal-container">
								<Entry />
							</div>
						</Fade>
					</TransitionGroup>
				</Modal>
			</div>
			<div className="background"></div>
		</nav>
	);
}

export default Navbar;
