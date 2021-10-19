import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";
import { StylesProvider } from "@material-ui/core";
import { ApolloProviderFC } from "./context/ApolloContext";

import App from "./App";

ReactDOM.render(
	<StrictMode>
		<CookiesProvider>
			<StylesProvider injectFirst>
				<ApolloProviderFC>
					<App />
				</ApolloProviderFC>
			</StylesProvider>
		</CookiesProvider>
	</StrictMode>,
	document.getElementById("root")
);
