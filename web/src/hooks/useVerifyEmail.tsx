import { gql, useMutation } from "@apollo/client";

export const verifyEmailGQL = gql`
	mutation verifyEmail($email: String!) {
		verifyEmail(email: $email)
	}
`;

const useVerifyEmail = () => {
	const [mutation, mutationResults] = useMutation(verifyEmailGQL);

	const verifyEmail = (email: string) => {
		return mutation({
			variables: {
				email,
			},
		});
	};

	return [verifyEmail, mutationResults] as const;
};

export default useVerifyEmail;
