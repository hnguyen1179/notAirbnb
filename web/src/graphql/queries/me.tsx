import { gql } from '@apollo/client'

const meQuery = gql`
	query meQuery {
		me {
			id
			firstName
			lastName
		}
	}
`;

export { meQuery };