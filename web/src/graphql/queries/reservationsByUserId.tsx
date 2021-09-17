import { gql } from "@apollo/client";

const RESERVATIONS_BY_USER_ID = gql`
	query reservationsByUserId($id: String!) {
		reservationsByUserId(id: $id) {
			id
			listingId
			dateStart
			dateEnd
			totalPrice
			listing {
				city
				title
				region
				cleaningFee
				price
			}
		}
	}
`;

export { RESERVATIONS_BY_USER_ID };
