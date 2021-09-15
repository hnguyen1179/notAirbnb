import { useMutation } from "@apollo/client";
import { Result } from "../types/mutations";
import useAuthToken from "./useAuthToken";
import { logInMutation } from "../graphql/mutations/login";

const useLoginMutation = () => {
	const [_, setAuthToken, removeAuthToken] = useAuthToken();

	const [mutation, mutationResults] = useMutation(logInMutation, {
		onCompleted: (data: Result) => {
			setAuthToken(data.login?.token);
		},
	});

	const login = (email: string, password: string) => {
		removeAuthToken();
		return mutation({
			variables: {
				email,
				password,
			},
		});
	};

	return [login, mutationResults] as const;
};

export default useLoginMutation;
