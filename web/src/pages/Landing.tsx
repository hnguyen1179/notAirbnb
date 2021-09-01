import React, { useContext, useRef, useEffect } from "react";
import { Cloudinary } from "@cloudinary/base";
import { AdvancedImage, placeholder } from "@cloudinary/react";

import { AppContext } from "../context/AppContext";
import { ReactComponent as Logo } from "../assets/icons/logo.svg";
import { ReactComponent as LogoWithName } from "../assets/icons/logo-with-name.svg";
import Search from "../components/Navbar/Search";
import Destinations from "../components/Destinations/Destinations";
import ListingTypes from "../components/ListingTypes/ListingTypes";
import Inspirations from "../components/Inspirations/Inspirations";

function Landing() {
	const searchRef = useRef<HTMLDivElement>(null);

	// Adds white background on search button on scroll down
	const handleScroll = () => {
		// handlescroll should also take care of the showing and hiding of the navigation bar at the bottom on mobile
		// scrolling up: reveal nav
		// scrolling down: hide nav

		// on small screens, not mobile: always show nav '!important' 
		if (window.scrollY > 0 && searchRef.current) {
			searchRef.current?.classList.add("active");
		} else {
			searchRef.current?.classList.remove("active");
		}
	};

	useEffect(() => {
		document.addEventListener("scroll", handleScroll);

		return () => {
			document.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className="Landing">
			<Search ref={searchRef} />

			<section className="Landing__hero">
				<div className="Landing__hero__content">
					<div className="Landing__hero__content__image">
						<img
							src="https://res.cloudinary.com/dcufjeb5d/image/upload/v1630378604/assets/hero-image-small.jpg"
							alt=""
						/>
					</div>
					<div className="Landing__hero__content__text">
						<span>Not sure where to go?</span>
						<span>Perfect.</span>
						<button>
							<a href="">
								<span>I'm flexible</span>
							</a>
						</button>
					</div>
				</div>
			</section>

			<section className="Landing__destinations">
				<Destinations />
			</section>

			<section className="Landing__listing-types">
				<ListingTypes />
			</section>

			<section className="Landing__try-hosting">
				<div className="Landing__try-hosting__content">
					<div className="Landing__try-hosting__content__image">
						<img
							src="https://res.cloudinary.com/dcufjeb5d/image/upload/v1630378678/assets/try-hosting-small.jpg"
							alt=""
						/>
					</div>
					<div className="Landing__try-hosting__content__text">
						<h3>Try hosting</h3>
						<span>
							Earn extra income and unlock new opportunities by
							sharing your space.
						</span>
						<button>
							<a href="">
								<span>Learn more</span>
							</a>
						</button>
					</div>
				</div>
			</section>

			<section className="Landing__inspirations">
				<Inspirations />
			</section>

		</div>
	);
}

export default Landing;
