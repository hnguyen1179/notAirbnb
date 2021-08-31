import React, { useContext, useRef, useEffect } from "react";
import { Cloudinary } from "@cloudinary/base";
import { AdvancedImage, placeholder } from "@cloudinary/react";

import { AppContext } from "../context/AppContext";
import { ReactComponent as Logo } from "../assets/svgs/logo.svg";
import { ReactComponent as LogoWithName } from "../assets/svgs/logo-with-name.svg";
import Search from "../components/Navbar/Search";

function Landing() {
	const searchRef = useRef<HTMLDivElement>(null);
	const { cloudinary } = useContext(AppContext);

	// Adds white background on search button on scroll down 
	const handleScroll = () => {
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
					<div className="Landing__hero__content__text">
						<span>Not sure where to go?</span>
						<span>Perfect.</span>
					</div>
					<button className="Landing__hero__content__button">
						<a href="">
							<span>I'm flexible</span>
						</a>
					</button>
				</div>
			</section>
			<section style={{ height: "2000px" }}></section>
		</div>
	);
}

export default Landing;
