import { gql } from "@apollo/client";

const CREATE_RESERVATION = gql`
	mutation createReservation($data: ReservationCreateInput!) {
		createReservation(data: $data) {
			id
			userId
			listingId
			dateStart
			dateEnd
			totalPrice
		}
	}
`;

export { CREATE_RESERVATION };
