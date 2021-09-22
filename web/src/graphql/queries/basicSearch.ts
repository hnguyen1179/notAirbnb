import { gql } from "@apollo/client";

const BASIC_SEARCH = gql`
	query basicSearch(
		$region: String!
		$numGuests: Int!
		$daysRequested: [String]!
	) {
		basicSearch(
			region: $region
			numGuests: $numGuests
			daysRequested: $daysRequested
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
