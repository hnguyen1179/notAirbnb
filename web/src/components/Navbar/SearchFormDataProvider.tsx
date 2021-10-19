import { useURLParams } from "../../context/URLParamsContext";
import { BasicSearchVariables } from "../../pages/SearchPage";
import SearchForm from "./SearchForm";

/**
 * This is an intermediary component that will be guaranteed to render under the
 * URLParamsProvider, whereas the SearchForm component can render either in the
 * landing page (no provider) or the search page (yes provider)
 *
 * Avoids massive prop drilling
 */

interface Props {
	handleCloseNavigation: () => void;
}

const SearchFormDataProvider = ({ handleCloseNavigation }: Props) => {
	const { state, variables, searchHandlers, submitNewQuery } = useURLParams();
	const filters: BasicSearchVariables = {
		region: state.location,
		guests: state.guests,
		checkIn: variables.checkIn,
		checkOut: variables.checkOut,
		tags: state.tags,
		listingType: state.listingType,
		languages: state.languages,
		smoking: state.smoking,
		pets: state.pets,
		superhost: state.superhost,
		entire: state.entire,
		privateListing: state.privateListing,
		offset: 0,
	};

	const { handleLocationChange, handleDateChange, handleGuestChange } =
		searchHandlers;

	return (
		<div style={{ height: "100%" }}>
			<SearchForm
				filters={filters}
				handleLocationChange={handleLocationChange}
				handleDateChange={handleDateChange}
				handleGuestChange={handleGuestChange}
				submitNewQuery={submitNewQuery}
				handleCloseNavigation={handleCloseNavigation}
			/>
		</div>
	);
};

export default SearchFormDataProvider;
