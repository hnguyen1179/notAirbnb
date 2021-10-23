import { FC } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { useAppState } from "../context/AppContext";
import { RouteComponentProps } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import MobileNavbar from "../components/MobileNavbar/MobileNavbar";

interface Props extends RouteComponentProps {}

const ErrorPage: FC<Props> = (props) => {
	const { mobile } = useAppState();
	const { cloudinary } = useAppState();

	return (
		<div className="ErrorPage">
			{mobile ? (
				<MobileNavbar />
			) : (
				<>
					<Navbar notLanding />
					<div className="Navbar-filler" />
				</>
			)}
			<div className="ErrorPage-container">
				<div className="ErrorPage__text">
					<header className="ErrorPage__text__head">
						<h1>Oops, it seems like something went wrong!</h1>
						<aside>
							We can't seem to find the page you're looking for.
						</aside>
					</header>
				</div>

				<div className="ErrorPage__gif">
					<AdvancedImage
						alt="Animation of sad girl dropping icecream from cone"
						cldImg={cloudinary.image("assets/error")}
						loading="lazy"
					/>
				</div>
			</div>

			{!mobile ? (
				<div className="ListingPage__footer">
					<div className="Footer-container">
						<Footer />
					</div>
				</div>
			) : null}
		</div>
	);
};

export default ErrorPage;
