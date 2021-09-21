import React from "react";
import { RouterProps } from "react-router";
import { ISearchPayload } from "../components/MobileNavbar/MobileSearchForm";

const SearchPage = (props: RouterProps) => {
  const payload = props.history.location.state as ISearchPayload;

	return (
		<div>
			im the search page
			{/* <div>{routeProps.location.state.region}</div> */}
		</div>
	);
};

export default SearchPage;
