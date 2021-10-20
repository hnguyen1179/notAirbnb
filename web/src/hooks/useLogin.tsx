import { useMutation } from "@apollo/client";
import { Result } from "../types/mutations";
import useAuthToken from "./useAuthToken";
import { LOG_IN } from "../graphql/mutations/login";

const useLoginMutation = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setAuthToken, removeAuthToken] = useAuthToken();

	const [mutation, mutationResults] = useMutation(LOG_IN, {
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
