import React from "react";
import { RouterProps } from "react-router";
import { ISearchPayload } from "../components/MobileNavbar/MobileSearchForm";
import { useBasicSearchQuery } from "../generated/graphql";

const SearchPage = (props: any) => {
  const payload = props.history.location.state.searchPayload as ISearchPayload;

	const { loading, error, data } = useBasicSearchQuery({
		variables: {
			daysRequested: payload.daysRequested,
			numGuests: payload.numGuests,
			region: payload.region,
		},
	});

	if (error) console.log(JSON.stringify(error, null, 2));
	console.log(data);

	return (
		<div>
			im the search page
			{/* <div>{routeProps.location.state.region}</div> */}
		</div>
	);
};

export default SearchPage;
