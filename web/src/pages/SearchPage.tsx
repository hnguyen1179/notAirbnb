import { useContext } from "react";
import { History } from "history";
import { useBasicSearchQuery } from "../generated/graphql";
import { AppContext } from "../context/AppContext";
import { ISearchPayload } from "../components/MobileNavbar/MobileSearchForm";

import SearchPageTopBar from "../components/SearchPageTopBar/SearchPageTopBar";
import Loading from "../components/Loading";
import { format } from "date-fns";
import Footer from "../components/Footer/Footer";
import MobileNavbar from "../components/MobileNavbar/MobileNavbar";
import SearchResultsItem from "../components/SearchResultsItem/SearchResultsItem";

interface Props {
	history: History<any>;
}

const SearchPage = ({ history }: Props) => {
	const { cloudinary, mobile } = useContext(AppContext);
	const payload = history.location.state.searchPayload as ISearchPayload;

	const { loading, error, data } = useBasicSearchQuery({
		variables: {
			daysRequested: payload.daysRequested,
			numGuests: payload.numGuests,
			region: payload.region,
		},
	});

	if (loading)
		return (
			<div className="page-loading">
				<Loading />
			</div>
		);

	const handleBack = () => {
		history.goBack();
	};

	const handleEditSearch = () => {};
	const handleEditFilter = () => {};

	if (error) console.log(JSON.stringify(error, null, 2));
	console.log(data);

	const searchDetails = `${format(payload.checkIn, "MMM d")} –
								${format(payload.checkOut, "MMM d")} · ${payload.numGuests} guest${
		payload.numGuests === 1 ? "" : "s"
	}`;

	const renderRegion = () => {
		if (payload.region === "Anywhere") {
			return "anywhere";
		} else {
			return `in ${payload.region}`;
		}
	};

	return (
		<div className="SearchPage">
			<SearchPageTopBar
				mobile={mobile}
				region={payload.region}
				searchDetails={searchDetails}
				handleBack={handleBack}
				handleEditSearch={handleEditSearch}
				handleEditFilter={handleEditFilter}
			/>

			<div className="SearchPage-container">
				<div className="SearchPage__results-details">
					<span>
						{data?.basicSearch.length} stays · {searchDetails}
					</span>
					<h1>Stays {renderRegion()}</h1>
				</div>

				<button className="SearchPage__button-filter">
					<div>Filters</div>
				</button>

				<div className="SearchPage__results">
					<ul className="SearchPage__results__list">
						{data?.basicSearch.length === 0 ? (
							<div className="no-results">
								<div>No results</div>
								<span>
									To get more results, try adjusting your
									search by changing your dates
								</span>

								<div className="divider" />
							</div>
						) : (
							data?.basicSearch.map((listing) => {
								if (!listing) return "";
								return (
									<SearchResultsItem
										cloudinary={cloudinary}
										listing={listing}
									/>
								);
							})
						)}
					</ul>
				</div>
			</div>

			{mobile && <MobileNavbar />}
			<div className="Footer-container">
				<Footer />
			</div>
		</div>
	);
};

export default SearchPage;
