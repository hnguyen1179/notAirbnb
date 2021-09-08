import React, { useEffect, useContext, useState } from "react";
import Modal from "@material-ui/core/Modal";
// import { useTransition } from "@react-spring/core";
// import { animated } from "@react-spring/web";
// import { useTransition, animated } from 'react-spring';
import { CSSTransition } from "react-transition-group";

import { useModal } from "../../context/ModalContext";
import { AppContext } from "../../context/AppContext";
import useLogout from "../../hooks/useLogout";

import Entry from "../Entry/Entry";
import Fade from "../Fade";
import { ReactComponent as LogoSvg } from "../../assets/icons/logo.svg";
import { ReactComponent as GlobeSvg } from "../../assets/icons/globe.svg";

import { ReactComponent as SearchSvg } from "../../assets/icons/thick-search.svg";
import Profile from "./Profile";
import SearchForm from "./SearchForm";

interface Props {
	isTop: boolean;
}

// This Navbar is for desktop view; contains a search
function Navbar({ isTop }: Props) {
	const [profile, setProfile] = useState(false);
	const [search, setSearch] = useState(false);
	const { user } = useContext(AppContext);

	// const transition = useTransition(search, {
	// 	from: { y: 75, opacity: 0 },
	// 	enter: { y: 0, opacity: 1 },
	// 	leave: { y: 75, opacity: 0 },
	// });

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
			{/* This is temporary to hold the profile compnent */}
			<div
				className="Navbar__left"
				onClick={(e) => {
					setProfile(false);
					e.stopPropagation();
				}}
			>
				<div className="Navbar__left__logo">
					<a href="/">
						<LogoSvg />
					</a>
				</div>

				<div className="Navbar__left__search">
					<CSSTransition
						in={search}
						timeout={150}
						unmountOnExit
						classNames="component"
					>
						<div className="Navbar__left__search__component">
							<SearchForm />
							<SearchSvg />
						</div>
					</CSSTransition>
					<CSSTransition
						in={!search}
						timeout={150}
						unmountOnExit
						classNames="button"
					>
						<button
							className="Navbar__left__search__button"
							onClick={handleClickSearch}
						>
							<div>Start your search</div>
							<SearchSvg />
						</button>
					</CSSTransition>
				</div>
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
