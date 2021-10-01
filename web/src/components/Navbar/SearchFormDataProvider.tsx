import { useURLParams } from "../../context/URLParamsContext";
import SearchForm from "./SearchForm";

/**
 * This is an intermediary component that will be guaranteed to render under the
 * URLParamsProvider, whereas the SearchForm component can render either in the
 * landing page (no provider) or the search page (yes provider)
 *
 * Avoids massive prop drilling
 */
const SearchFormDataProvider = () => {
	const { state } = useURLParams();

	return (
		<div style={{ height: "100%" }}>
			<SearchForm
				location={state.location}
				dates={state.dates}
				guests={state.guests}
			/>
		</div>
	);
};

export default SearchFormDataProvider;
