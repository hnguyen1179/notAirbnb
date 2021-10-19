import { useCookies } from "react-cookie";

const TOKEN_NAME = "authToken";

type AuthToken = string;

function useAuthToken() {
	const [cookies, setCookie, removeCookie] = useCookies([TOKEN_NAME]);
	const setAuthToken = (authToken: AuthToken) => {
		const expirationDate = new Date();
		expirationDate.setDate(expirationDate.getDate() + 7);
		setCookie(TOKEN_NAME, authToken, {
			path: "/",
			expires: expirationDate,
		});
	};
	const removeAuthToken = () => {
		console.log("removing auth token ... ");
		console.log("TOKEN NAME IS ... ", TOKEN_NAME);
		console.log("COOKIES ARE ... ", cookies);
		setCookie(TOKEN_NAME, "");
		// removeCookie(TOKEN_NAME);
	};

	return [cookies[TOKEN_NAME], setAuthToken, removeAuthToken];
}

export default useAuthToken;
