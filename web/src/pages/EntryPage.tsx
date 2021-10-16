import EntryForm from "../components/Entry/EntryForm";
import Footer from "../components/Footer/Footer";
import MobileNavbar from "../components/MobileNavbar/MobileNavbar";
import Navbar from "../components/Navbar/Navbar";
import { useAppState } from "../context/AppContext";
import { useModal } from "../context/ModalContext";

const EntryPage = () => {
	const { mobile } = useAppState();
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
			<div className="Entry__entryform-container">
				<EntryForm initialEntry="unverified" isModal={false} />
			</div>
			<div className={"cover" + (demoClicked ? " active" : "")}></div>

			{mobile ? (
				<MobileNavbar />
			) : (
				<div className="Footer-container">
					<Footer />
				</div>
			)}
		</div>
	);
};

export default EntryPage;
