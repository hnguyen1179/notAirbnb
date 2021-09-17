import { gql } from "@apollo/client";

const USER_BY_ID = gql`
	query userById($id: String!) {
		userById(id: $id) {
			id
			firstName
			lastName
			email
			dateJoined
      reviewsCount
		}
	}
`;

export { USER_BY_ID };
