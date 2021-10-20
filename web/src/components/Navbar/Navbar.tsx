import { SyntheticEvent, useEffect, useState, useRef } from "react";
import Modal from "@material-ui/core/Modal";
import { CSSTransition } from "react-transition-group";

import { useModal } from "../../context/ModalContext";

import Entry from "../Entry/Entry";
import Fade from "../Fade";
import { ReactComponent as LogoSvg } from "../../assets/icons/logo.svg";
import { ReactComponent as LogoNameSvg } from "../../assets/icons/logo-with-name.svg";
import { ReactComponent as GlobeSvg } from "../../assets/icons/globe.svg";

import { ReactComponent as SearchSvg } from "../../assets/icons/thick-search.svg";
import Dropdown from "./Dropdown";
import SearchForm from "./SearchForm";
import SearchBar from "./SearchBar";
import SearchFormDataProvider from "./SearchFormDataProvider";
import { Link } from "react-router-dom";

interface Props {
	isTop?: boolean; // Denotes whether or not Navbar is at the top of page or not; used in Landing
	notLanding?: boolean; // Denotes whether or not Navbar is used on LandingPage or not
	disableEntry?: boolean; // Prevent login and signup modal from appearing
	searchPage?: boolean;
	searchDetails?: string;
	location?: string;
}

// This Navbar is for desktop view; contains a search
function Navbar({
	isTop,
	notLanding = false,
	disableEntry = false,
	searchPage = false,
	searchDetails,
	location,
}: Props) {
	const componentRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);
	const [dropdown, setDropdown] = useState(false);
	const [search, setSearch] = useState(false);

	// Good react pattern in useModal; incorporate hooks within Context APIs that check for undefined
	const { open, setOpen, setEntry } = useModal();

	// Opens modal; closes profile and search components
	const handleOpen = (e: SyntheticEvent<EventTarget>) => {
		e.stopPropagation();
		if (disableEntry) {
			setDropdown(false);
			return;
		}

		document.body.style.overflow = "hidden";
		setEntry("unverified");
		setSearch(false);
		setDropdown(false);
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
		setDropdown(false);
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
		setDropdown(false);
	};

	// Activates the Search component if at the very top of screen only on landing
	useEffect(() => {
		if (notLanding) return;

		if (isTop) {
			setSearch(true);
		} else {
			setSearch(false);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isTop]);

	// Creates event listeners to click out of profile and search components
	useEffect(() => {
		window.addEventListener("closeNavigation", handleCloseNavigation);
		document.body.addEventListener("click", handleBodyClick);
		window.addEventListener("scroll", handleCloseNavigation);

		return () => {
			window.removeEventListener(
				"closeNavigation",
				handleCloseNavigation
			);
			document.body.removeEventListener("click", handleBodyClick);
			window.removeEventListener("scroll", handleCloseNavigation);
			if (open) handleClose();
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
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
						setDropdown(false);
						e.stopPropagation();
					}}
				>
					<div className="Navbar__left__logo">
						<Link to="/">
							<LogoNameSvg className="logo-name" />
							<LogoSvg className="logo" />
						</Link>
					</div>
				</div>

				{/* Render this only on the landing page */}
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

				{searchPage && (
					<div className="Navbar__search--search-page">
						<CSSTransition
							in={search}
							timeout={150}
							unmountOnExit
							classNames="component"
							nodeRef={componentRef}
						>
							<div
								className="Navbar__search__component Navbar__search__component--search-page"
								ref={componentRef}
							>
								<div className="Navbar__search__component__categories">
									<span>Places to stay</span>
									<span>Experiences</span>
									<span>Online Experiences</span>
								</div>
								<SearchFormDataProvider
									handleCloseNavigation={
										handleCloseNavigation
									}
								/>
							</div>
						</CSSTransition>
						<CSSTransition
							in={!search}
							timeout={150}
							unmountOnExit
							classNames="button"
							nodeRef={buttonRef}
						>
							<button
								className="Navbar__search__button--search-page"
								ref={buttonRef}
								onClick={handleClickSearch}
							>
								<SearchBar
									location={location}
									searchDetails={searchDetails as string}
								/>
							</button>
						</CSSTransition>
					</div>
				)}

				<div className="Navbar__right">
					<div className="Navbar__right__host">
						<a
							href="https://dukenguyen.dev"
							target="_blank"
							rel="noreferrer"
						>
							<span>Hire me</span>
						</a>
					</div>
					<div className="Navbar__right__globe">
						<button>
							<GlobeSvg />
						</button>
					</div>
					<Dropdown
						dropdown={dropdown}
						setDropdown={setDropdown}
						handleOpen={handleOpen}
					/>
				</div>

				{/* Modal for the entry form */}
				<Modal open={open} onClose={handleClose} disableScrollLock>
					<Fade ref={modalRef}>
						<div className="Modal-container">
							<Entry />
						</div>
					</Fade>
				</Modal>
			</div>
			<div className="background"></div>
		</nav>
	);
}

export default Navbar;
