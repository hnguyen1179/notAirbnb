import { gql } from "@apollo/client";

const REVIEWS_BY_HOST_ID = gql`
	query reviewsByHostId($id: String!, $offset: Int) {
		reviewsByHostId(id: $id, offset: $offset) {
			id
			listingId
			authorId
			date
			content
			listing {
				id
				title
				region
			}
			author {
				firstName
				dateJoined
			}
		}
	}
`;

export { REVIEWS_BY_HOST_ID };
