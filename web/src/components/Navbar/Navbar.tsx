import React, { useContext } from "react";
import Modal from "@material-ui/core/Modal";

import { useModal } from "../../context/ModalContext";
import { AppContext } from "../../context/AppContext";
import useLogout from "../../hooks/useLogout";

import Entry from "../Entry/Entry";
import Fade from "../Fade";

// This Navbar is for desktop view; contains a search
function Navbar() {
	const { user } = useContext(AppContext);
	// Good react pattern in useModal; incorporate hooks within Context APIs that check for undefined
	const { open, setOpen, setEntry } = useModal();

	const handleLogout = useLogout();

	const handleOpen = (e: React.SyntheticEvent<EventTarget>) => {
		setEntry("unverified");
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<nav className="Navbar-container">
			{/* This is temporary to hold the profile compnent */}
			<div className="Navbar-container__profile">
				{user ? (
					<h1 data-testid="greeting">hello, {user.firstName}</h1>
				) : (
					<div>
						<button onClick={handleOpen}>sign up</button>
						<button onClick={handleOpen}>log in</button>
					</div>
				)}
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
		</nav>
	);
}

export default Navbar;
