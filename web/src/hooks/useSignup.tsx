import { useMutation } from "@apollo/client";
import { Result } from "../types/mutations";
import useAuthToken from "./useAuthToken";
import { SIGN_UP } from "../graphql/mutations/signup";

const useSignup = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setAuthToken] = useAuthToken();

	const [mutation, mutationResults] = useMutation(SIGN_UP, {
		onCompleted: (data: Result) => {
			setAuthToken(data.signup?.token);
		},
	});

	const signup = (
		email: string,
		password: string,
		firstName: string,
		lastName: string
	) => {
		return mutation({
			variables: {
				email,
				password,
				firstName,
				lastName,
			},
		});
	};

	return [signup, mutationResults] as const;
};

export default useSignup;
