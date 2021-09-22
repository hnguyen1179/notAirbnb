import { gql } from "@apollo/client";

const BASIC_SEARCH = gql`
	query basicSearch(
		$region: String!
		$guests: Int!
		$checkIn: String!
		$checkOut: String!
	) {
		basicSearch(
			region: $region
			guests: $guests
			checkIn: $checkIn
			checkOut: $checkOut
		) {
			count
			listings {
				id
				title
				listingType
				city
				region
				cleaningFee
				price
				superhost
				averageScore
				reviewsCount
			}
		}
	}
`;

export { BASIC_SEARCH };
