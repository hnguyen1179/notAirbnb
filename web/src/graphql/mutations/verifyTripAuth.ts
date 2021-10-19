import { gql } from "@apollo/client";

const VERIFY_TRIP_AUTH = gql`
	mutation verifyTripAuth($userId: String!, $reservationId: String!) {
		verifyTripAuth(userId: $userId, reservationId: $reservationId)
	}
`;

export { VERIFY_TRIP_AUTH };
