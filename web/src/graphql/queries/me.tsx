import { gql } from '@apollo/client'

const ME = gql`
	query me {
		me {
			id
			firstName
			lastName
		}
	}
`;

export { ME };