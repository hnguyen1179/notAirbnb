import React, { useContext } from "react";
import useLogout from "../hooks/useLogout";
import { AppContext } from "../context/AppContext";
import { useModal } from "../context/ModalContext";
import Modal from "@material-ui/core/Modal";
import Entry from "./Entry/Entry";
import { Transition } from "react-transition-group";

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
			{user ? (
				<h1 data-testid="greeting">hello, {user.firstName}</h1>
			) : (
				<div>
					<button onClick={handleOpen}>sign up</button>
					<button onClick={handleOpen}>log in</button>
				</div>
			)}

			<Transition timeout={1000} mountOnEnter unmountOnExit in={open} >
				<Modal open={open} onClose={handleClose}>
					<div className="Modal-container">
						<Entry />
					</div>
				</Modal>
			</Transition>

			{user ? <button onClick={handleLogout}>logout</button> : ""}
		</div>
	);
}

export default Navbar;
