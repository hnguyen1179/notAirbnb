import { gql } from "@apollo/client";

const signUpMutation = gql`
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

export { signUpMutation };
