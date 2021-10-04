import { gql } from "@apollo/client";

const REVIEWS_BY_LISTING_ID = gql`
	query reviewsByListingId($id: String!, $offset: Int) {
		reviewsByListingId(id: $id, offset: $offset) {
      id
      date
			content
      listing {
        id
        title
        region
      }
			author {
        id
				firstName
				dateJoined
			}
		}
	}
`;

export { REVIEWS_BY_LISTING_ID };
