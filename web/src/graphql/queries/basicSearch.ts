import { gql } from "@apollo/client";

const BASIC_SEARCH = gql`
	query basicSearch(
		$region: String
		$guests: Int
		$checkIn: String
		$checkOut: String
		$offset: Int!
		$tags: [String!]
		$languages: [String!]
		$listingType: [String!]
		$superhost: Boolean
		$pets: Boolean
		$smoking: Boolean
		$entire: Boolean
		$privateListing: Boolean
	) {
		basicSearch(
			region: $region
			guests: $guests
			checkIn: $checkIn
			checkOut: $checkOut
			offset: $offset
			tags: $tags
			languages: $languages
			listingType: $listingType
			superhost: $superhost
			pets: $pets
			smoking: $smoking
			entire: $entire
			privateListing: $privateListing
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
				basicAmenities
				numGuests
				numBedrooms
				numBeds
				numBaths
				imageComments
			}
			offset
		}
	}
`;

export { BASIC_SEARCH };
