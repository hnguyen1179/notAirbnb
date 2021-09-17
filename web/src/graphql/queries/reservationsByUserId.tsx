import { gql } from "@apollo/client";

const RESERVATIONS_BY_USER_ID = gql`
	query reservationsByUserId($id: String!) {
		reservationsByUserId(id: $id) {
			id
			listingId
			dateStart
			dateEnd
			listing {
				city
				title
				region
			}
		}
	}
`;

export { RESERVATIONS_BY_USER_ID };
