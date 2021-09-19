import { gql } from "@apollo/client";

const HOST_BY_ID = gql`
	query hostById($id: String!) {
		hostById(id: $id) {
			id
			firstName
			dateJoined
			description
			details
			medals
			listings {
				id
				title
				reviewsCount
				languages
				score
				scores
			}
		}
	}
`;

export { HOST_BY_ID };
