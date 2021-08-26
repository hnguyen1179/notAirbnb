import React from "react";
import {ReactComponent as Logo} from "../assets/svgs/logo.svg";
import {ReactComponent as LogoWithName} from "../assets/svgs/logo-with-name.svg";

function Landing() {
	return (
		<div>
			<Logo height="300px" />
			<LogoWithName height="300px" />
		</div>
	);
}

export default Landing;
