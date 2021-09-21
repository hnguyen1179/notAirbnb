import { gql } from "@apollo/client";

const HOST_BY_ID = gql`
	query hostById($id: String!) {
		hostById(id: $id) {
			id
			firstName
			dateJoined
			description
			medals
			listings {
				id
				title
				reviewsCount
				listingType
				region
				averageScore
			}
		}
	}
`;

export { HOST_BY_ID };
