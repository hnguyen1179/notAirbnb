import { useApolloClient } from "@apollo/client";
import useAuthToken from "./useAuthToken";

const useLogout = () => {
	const [, , removeAuthToken] = useAuthToken();
	const apolloClient = useApolloClient();

	const logout = async () => {
		await apolloClient.clearStore(); // we remove all information in the store
		removeAuthToken(); // we clear the authToken from cookies

		// TODO: Maybe don't remove the auth token on logut and if they opt to log in
		// check if they have a token, if so, just let them enter their password to log in
		// This allows you to get a picture of their ID

		// TODO: Create an avatar and add avatar to cloudinary with id as filename
		// on creation of user
	};

	return logout;
};

export default useLogout;
