import { gql } from "@apollo/client";

const SIGN_UP = gql`
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

export { SIGN_UP };
