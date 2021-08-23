import React from "react";
import LogoWithName from "../assets/svgs/logo-with-name.svg";
import Logo from "../assets/svgs/logo.svg";

import Login from "../components/Login/Login"

function Landing() {
	return (
		<div>
      <img style={{ height: '300px' }} src={Logo} alt="notAirbnb's Logo" />
      <Login />
		</div>
	);
}

export default Landing;
