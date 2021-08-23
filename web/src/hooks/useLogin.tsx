import { gql, useMutation } from "@apollo/client";
import { Result } from "../types/mutations";
import useAuthToken from "./useAuthToken";

export const loginMutationGQL = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			user {
				firstName
				lastName
			}
			token
		}
	}
`;

const useLoginMutation = () => {
	const [_, setAuthToken, removeAuthToken] = useAuthToken();

	const [mutation, mutationResults] = useMutation(loginMutationGQL, {
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