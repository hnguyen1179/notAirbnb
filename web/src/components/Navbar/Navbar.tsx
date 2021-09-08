import React, { useEffect, useContext, useState } from "react";
import Modal from "@material-ui/core/Modal";

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

// This Navbar is for desktop view; contains a search
function Navbar() {
	const [profile, setProfile] = useState(false);
	const [search, setSearch] = useState(false);
	const { user } = useContext(AppContext);
	// Good react pattern in useModal; incorporate hooks within Context APIs that check for undefined
	const { open, setOpen, setEntry } = useModal();

	const handleLogout = useLogout();

	const handleOpen = (e: React.SyntheticEvent<EventTarget>) => {
		e.stopPropagation();
		setEntry("unverified");
		setSearch(false);
		setProfile(false);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleClickSearch = (e: React.SyntheticEvent<EventTarget>) => {
		e.stopPropagation();
		setProfile(false);
		setSearch(true);
	};

	const handleBodyClick = () => {
		const closeNavigation = new Event("closeNavigation");
		window.dispatchEvent(closeNavigation);
	};

	const handleCloseNavigation = () => {
		// Clicking on the body while search or profile is opened will close either
		setSearch(false);
		setProfile(false);
	};

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

	const searchActive = search ? "active" : "";

	return (
		<nav className={`Navbar ${searchActive}`}>
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
					{search ? (
						<div className="Navbar__left__search__component">
							<SearchForm />
							<SearchSvg />
						</div>
					) : (
						<button
							className="Navbar__left__search__button"
							onClick={handleClickSearch}
						>
							<div>Start your search</div>
							<SearchSvg />
						</button>
					)}
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
