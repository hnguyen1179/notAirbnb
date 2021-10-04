import { ReactComponent as SearchSvg } from "../../assets/icons/circle-search.svg";

interface Props {
	location: string | undefined;
	searchDetails: string;
}

const SearchBar = ({ location, searchDetails }: Props) => {
	const [searchDates, searchGuests = "Add guests"] =
		searchDetails.split(" · ");

	return (
		<div className="SearchBar">
			<div className="SearchBar__edit-button SearchBar__edit-button--location">
				{location ? location : "Nearby"}
			</div>
			<span className="divider"></span>
			<div className="SearchBar__edit-button SearchBar__edit-button--dates">
				{searchDates}
			</div>
			<span className="divider"></span>
			<div className="SearchBar__edit-button SearchBar__edit-button--guests">
				{searchGuests}
			</div>
			<div className="SearchBar__submit">
				<SearchSvg />
			</div>
		</div>
	);
};

export default SearchBar;
