import React, { useContext } from "react";
import AppContext from "../context/app-context";
import { gql, useQuery } from "@apollo/client";

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
	const { user } = useContext(AppContext);
	const { loading, error, data } = useQuery(LISTINGS_QUERY);
	if (loading) return <p> loading ... </p>;
	if (error) return <p> {error.message} </p>;

	return (
		<div>
			{data.allListings.map((listing: Listing) => {
				return (
					<div>
						<a href={`listing/${listing.id}`}>{listing.title}</a>
					</div>
				);
			})}
		</div>
	);
}

export default Listings;
