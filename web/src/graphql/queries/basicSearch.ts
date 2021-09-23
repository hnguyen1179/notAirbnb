import { gql } from "@apollo/client";

const BASIC_SEARCH = gql`
	query basicSearch(
		$region: String!
		$guests: Int!
		$checkIn: String!
		$checkOut: String!
		$offset: Int!
	) {
		basicSearch(
			region: $region
			guests: $guests
			checkIn: $checkIn
			checkOut: $checkOut
			offset: $offset
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
			offset
		}
	}
`;

export { BASIC_SEARCH };
