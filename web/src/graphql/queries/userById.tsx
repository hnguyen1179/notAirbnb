import { gql } from "@apollo/client";

const userByIdQuery = gql`
	query userByIdQuery($id: String!) {
		userById(id: $id) {
			id
      firstName
      lastName
      email
      dateJoined
      reviews {
        listingId
        date
        content
        scores
        listing {
          host {
            id
            firstName
            dateJoined
            listings {
              city
            }
          }
        }
      }
		}
	}
`;

export { userByIdQuery };
