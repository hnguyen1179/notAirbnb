import { useApolloClient } from "@apollo/client";
import useAuthToken from "./useAuthToken";

const useLogout = () => {
	const [, , removeAuthToken] = useAuthToken();
	const apolloClient = useApolloClient();

	const logout = async () => {
		console.log("LOGGING Out")
		apolloClient.clearStore().then(() => {
			apolloClient.resetStore();
		}); // we remove all information in the store
		removeAuthToken(); // we clear the authToken from cookies
	};

	return logout;
};

export default useLogout;
