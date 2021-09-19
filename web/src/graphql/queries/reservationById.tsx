import { gql } from "@apollo/client";

const RESERVATION_BY__ID = gql`
	query reservationById($id: String!) {
		reservationById(id: $id) {
			id
			listingId
			dateStart
			dateEnd
			totalPrice
			listing {
				city
				title
				region
				address
				price
				cleaningFee
				houseRules
				imageComments
				host {
					id
					firstName
				}
			}
		}
	}
`;

export { RESERVATION_BY__ID };
