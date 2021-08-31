import React, { useContext } from "react";
import { Cloudinary } from "@cloudinary/base";
import { AdvancedImage, placeholder } from "@cloudinary/react";

import { AppContext } from "../context/AppContext";
import { ReactComponent as Logo } from "../assets/svgs/logo.svg";
import { ReactComponent as LogoWithName } from "../assets/svgs/logo-with-name.svg";

function Landing() {
	const { cloudinary } = useContext(AppContext);

	const heroImage = cloudinary.image("assets/hero-image");

	return (
		<div className="Landing">
			<section className="Landing__hero">
				<div>
					<span>Not sure where to go?</span>
					<span>Perfect.</span>
				</div>
				<button>
					<a href="">I'm flexible</a>
				</button>
			</section>
		</div>
	);
}

export default Landing;
