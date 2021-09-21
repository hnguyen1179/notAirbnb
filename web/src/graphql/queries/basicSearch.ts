import { gql } from "@apollo/client";

const BASIC_SEARCH = gql`
	query basicSearch($region: String!, $numGuests: Int!, $daysRequested: String[]!) {
		basicSearch(region: $region, numGuests: $numGuests, daysRequested: $daysRequested) {
			title
      region
		}
	}
`;

export { BASIC_SEARCH };
