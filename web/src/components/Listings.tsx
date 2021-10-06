import { useAppState } from "../context/AppContext";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const LISTINGS_QUERY = gql`
	query LISTINGS_QUERY {
		allListings {
			id
			title
			numBaths
		}
	}
`;

interface Listing {
	id: string;
	title: string;
	numBaths: number;
}

function Listings() {
	const { user } = useAppState();
	const { loading, error, data } = useQuery(LISTINGS_QUERY);
	if (loading) return <p> loading ... </p>;
	if (error) return <p> {error.message} </p>;

	return (
		<div>
			{data.allListings.map((listing: Listing) => {
				return (
					<div>
						<Link to={`listing/${listing.id}`}>{listing.title}</Link>
					</div>
				);
			})}
		</div>
	);
}

export default Listings;
