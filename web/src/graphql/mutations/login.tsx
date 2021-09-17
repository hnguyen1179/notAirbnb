import { gql } from "@apollo/client";

const LOG_IN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			user {
				id
				firstName
				lastName
				email
			}
			token
		}
	}
`;

export { LOG_IN };
