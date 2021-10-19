import { gql } from "@apollo/client";

const DELETE_RESERVATION = gql`
	mutation deleteReservation($id: String!) {
		deleteReservation(id: $id) {
			id
		}
	}
`;

export { DELETE_RESERVATION };
