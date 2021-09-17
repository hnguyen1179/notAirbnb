import { useApolloClient } from "@apollo/client";
import useAuthToken from "./useAuthToken";

const useLogout = () => {
	const [, , removeAuthToken] = useAuthToken();
	const apolloClient = useApolloClient();

	const logout = async () => {
		await apolloClient.clearStore(); // we remove all information in the store
		removeAuthToken(); // we clear the authToken from cookies
	};

	return logout;
};

export default useLogout;
