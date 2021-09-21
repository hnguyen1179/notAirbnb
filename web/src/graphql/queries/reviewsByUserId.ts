import { gql } from "@apollo/client";

const REVIEWS_BY_USER_ID = gql`
	query reviewsByUserId($id: String!, $offset: Int) {
		reviewsByUserId(id: $id, offset: $offset) {
			id
			listingId
			date
			content
			scores
			listing {
				host {
					id
					firstName
					dateJoined
				}
			}
		}
	}
`;

export { REVIEWS_BY_USER_ID };
