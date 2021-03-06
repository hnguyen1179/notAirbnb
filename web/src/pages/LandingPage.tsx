import { useState, useRef, useEffect } from "react";

import { useAppState } from "../context/AppContext";
import Destinations from "../components/Destinations/Destinations";
import ListingTypes from "../components/ListingTypes/ListingTypes";
import Inspirations from "../components/Inspirations/Inspirations";
import Footer from "../components/Footer/Footer";
import MobileNavbar from "../components/MobileNavbar/MobileNavbar";
import MobileSearch from "../components/MobileNavbar/MobileSearch";
import Hero from "../components/Hero/Hero";
import TryHosting from "../components/TryHosting/TryHosting";
import Navbar from "../components/Navbar/Navbar";

const LandingPage = () => {
	const { mobile } = useAppState();
	const [isTop, setIsTop] = useState(true);

	const searchRef = useRef<HTMLDivElement>(null);
	const landingRef = useRef<HTMLDivElement>(null);
	const mobileNavbarRef = useRef<HTMLElement>(null);

	const handleMobileSearchBar = () => {
		// Manages the top search bar on mobile
		// Adds white background on search button on scroll down
		if (window.scrollY > 0) {
			setIsTop(false);
			searchRef.current?.classList.add("active");
		} else {
			setIsTop(true);
			searchRef.current?.classList.remove("active");
		}
	};

	// Fires for mobile, smaller screens
	useEffect(() => {
		document.addEventListener("scroll", handleMobileSearchBar);
		document.body.style.overflow = "initial";

		return () => {
			document.removeEventListener("scroll", handleMobileSearchBar);
			// localStorage.removeItem('params');
		};
	}, []);

	return (
		<div className="Landing" ref={landingRef}>
			{mobile ? (
				<>
					<MobileNavbar ref={mobileNavbarRef} />
					<MobileSearch ref={searchRef} />
				</>
			) : (
				<Navbar isTop={isTop} />
				//Search component, which overlaps with Navbar, but will pop out
				// when scrolled to the very top
			)}

			<section className="Landing__hero">
				<Hero />
			</section>

			<section className="Landing__destinations">
				<Destinations />
			</section>

			<section className="Landing__listing-types">
				<ListingTypes />
			</section>

			<section className="Landing__try-hosting">
				<TryHosting />
			</section>

			<section className="Landing__inspirations">
				<Inspirations />
			</section>

			<footer className="Landing__footer">
				<Footer />
			</footer>
		</div>
	);
};

export default LandingPage;
