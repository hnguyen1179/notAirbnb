import React, { useContext } from "react";
import useLogout from "../hooks/useLogout";
import { AppContext } from "../context/AppContext";
import { useModal } from "../context/ModalContext";
import Loading from "./Loading";
import Modal from "@material-ui/core/Modal";
import Entry from "./Entry/Entry";

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
		<div className="Navbar-container">
			<Loading />
			{user ? (
				<h1 data-testid="greeting">hello, {user.firstName}</h1>
			) : (
				<div>
					<button onClick={handleOpen}>sign up</button>
					<button onClick={handleOpen}>log in</button>
				</div>
			)}

			<Modal open={open} onClose={handleClose} tabIndex={-1}>
				<div className="Modal-container" tabIndex={-1}>
					<Entry />
				</div>
			</Modal>

			{user ? <button onClick={handleLogout}>logout</button> : ""}
		</div>
	);
}

export default Navbar;
