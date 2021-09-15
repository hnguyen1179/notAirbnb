import React, { useContext } from "react";
import EntryForm from "../components/Entry/EntryForm";
import Footer from "../components/Footer/Footer";
import MobileNavbar from "../components/MobileNavbar/MobileNavbar";
import Navbar from "../components/Navbar/Navbar";
import { AppContext } from "../context/AppContext";
import { useModal } from "../context/ModalContext";

const EntryPage = () => {
	const { mobile } = useContext(AppContext);
	const { demoClicked } = useModal();

	return (
		<div className="Entry">
			{mobile ? (
				""
			) : (
				<>
					<Navbar notLanding={true} disableEntry={true} />
					<div className="Navbar-filler"></div>
				</>
			)}

			<EntryForm initialEntry="unverified" isModal={false} />
			<div className={"cover" + (demoClicked ? " active" : "")}></div>

			{mobile ? <MobileNavbar /> : ""}
			{mobile ? "" : <Footer />}
		</div>
	);
};

export default EntryPage;
