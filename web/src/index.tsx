import React from "react";
import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";
import { StylesProvider } from "@material-ui/core";

import App from "./App";

ReactDOM.render(
	<React.StrictMode>
		<CookiesProvider>
			<StylesProvider injectFirst>
				<App />
			</StylesProvider>
		</CookiesProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
