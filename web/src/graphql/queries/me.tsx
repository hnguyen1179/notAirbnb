import { gql } from '@apollo/client'

const meQuery = gql`
	query meQuery {
		me {
			firstName
			lastName
		}
	}
`;

export { meQuery };