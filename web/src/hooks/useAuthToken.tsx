import { useCookies } from "react-cookie";

const TOKEN_NAME = "authToken";

type AuthToken = string;

function useAuthToken() {
	const [cookies, setCookie] = useCookies([TOKEN_NAME]);
	const setAuthToken = (authToken: AuthToken) => {
		const expirationDate = new Date();
		expirationDate.setDate(expirationDate.getDate() + 7);
		setCookie(TOKEN_NAME, authToken, {
			path: "/",
			expires: expirationDate,
		});
	};
	const removeAuthToken = () => {
		setCookie(TOKEN_NAME, "");
	};

	return [cookies[TOKEN_NAME], setAuthToken, removeAuthToken];
}

export default useAuthToken;
