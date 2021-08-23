import { gql, useMutation } from "@apollo/client";
import { Result } from "../types/mutations";
import useAuthToken from "./useAuthToken";

const signUpMutationGQL = gql`
	mutation signup(
		$email: String!
		$firstName: String!
		$lastName: String!
		$password: String!
	) {
		signup(
			email: $email
			firstName: $firstName
			lastName: $lastName
			password: $password
		) {
			token
		}
	}
`;

const useSignup = () => {
	const [_, setAuthToken] = useAuthToken();

	const [mutation, mutationResults] = useMutation(signUpMutationGQL, {
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
