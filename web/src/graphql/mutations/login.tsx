import { gql } from "@apollo/client";

const logInMutation = gql`
	mutation logInMutation($email: String!, $password: String!) {
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

export { logInMutation };
