import { gql } from "@apollo/client";

const LISTING_BY_ID = gql`
	query listingById($id: String!) {
		listingById(id: $id) {
			id
			address
			city
			state
			title
			listingType
			region
			cleaningFee
			price
			superhost
			averageScore
			reviewsCount
			imageComments
			amenities
			languages
			numGuests
			numBedrooms
			numBeds
			numBaths
			highlights
			listingDescription
			locationDescription
			stayDescription
			datesUnavailable
			languages
			houseRules
			healthAndSafety
			host {
				id
				firstName
				medals
				details
				description
				dateJoined
			}
		}
	}
`;

export { LISTING_BY_ID };
