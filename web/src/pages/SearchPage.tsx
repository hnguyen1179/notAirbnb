import { useContext, useState, MouseEvent } from "react";
import { History } from "history";
import { useBasicSearchQuery } from "../generated/graphql";
import { AppContext } from "../context/AppContext";
import { ISearchPayload } from "../components/MobileNavbar/MobileSearchForm";
import { parse } from "query-string";
import SearchPageTopBar from "../components/SearchPageTopBar/SearchPageTopBar";
import Loading from "../components/Loading";
import { format } from "date-fns";
import Footer from "../components/Footer/Footer";
import MobileNavbar from "../components/MobileNavbar/MobileNavbar";
import SearchResultsItem from "../components/SearchResultsItem/SearchResultsItem";
import SearchResultsPagination from "../components/SearchResultsPagination/SearchResultsPagination";

interface Props {
	history: History<any>;
}

const SearchPage = ({ history }: Props) => {
	const { cloudinary, mobile } = useContext(AppContext);
	const [currentPage, setCurrentPage] = useState(1);

	const parsed = parse(history.location.search);
	const region = parsed.region as string;
	const checkIn = new Date(parsed["check-in"] as string);
	const checkOut = new Date(parsed["check-out"] as string);
	const numGuests = parseInt(parsed.guests as string);

	// const payload = history.location.state.searchPayload as ISearchPayload;

	const { loading, error, data, fetchMore } = useBasicSearchQuery({
		variables: {
			region: parsed.region as string,
			guests: parseInt(parsed.guests as string),
			checkIn: parsed["check-in"] as string,
			checkOut: parsed["check-out"] as string,
		},
	});

	if (error) {
		console.log(JSON.stringify(error, null, 2));
		return <>uh oh</>;
	}

	if (loading)
		return (
			<div className="page-loading">
				<Loading />
			</div>
		);

	const handleBack = () => {
		history.goBack();
	};

	const handlePageClick = async (e: MouseEvent<HTMLLIElement>) => {
		const nextPage = parseInt(e?.currentTarget?.innerText);
		setCurrentPage(nextPage);

		console.log(" clicking next page ");
		console.log("new offset: ", (nextPage - 1) * 10);
		await fetchMore({
			variables: {
				offset: (nextPage - 1) * 10,
			},
		});

		// pagination should push to the router history, thereby allowing you
		// to navigate with browser back and forward buttons

		// https://stackoverflow.com/questions/57463578/how-to-use-the-history-to-update-the-pagination-bar-with-react-router
	};

	const handleEditSearch = () => {};
	const handleEditFilter = () => {};

	const searchDetails = `${format(checkIn, "MMM d")} –
								${format(checkOut, "MMM d")} · ${numGuests} guest${numGuests === 1 ? "" : "s"}`;

	const renderRegion = () => {
		if (region === "Anywhere") {
			return "anywhere";
		} else {
			return `in ${region}`;
		}
	};

	return (
		<div className="SearchPage">
			<SearchPageTopBar
				mobile={mobile}
				region={region}
				searchDetails={searchDetails}
				handleBack={handleBack}
				handleEditSearch={handleEditSearch}
				handleEditFilter={handleEditFilter}
			/>

			<div className="SearchPage-container">
				<div className="SearchPage__results-details">
					<span>
						{data?.basicSearch?.count} stays · {searchDetails}
					</span>
					<h1>Stays {renderRegion()}</h1>
				</div>

				<button className="SearchPage__button-filter">
					<div>Filters</div>
				</button>

				<div className="SearchPage__results">
					<ul className="SearchPage__results__list">
						{data?.basicSearch?.listings.length === 0 ? (
							<div className="no-results">
								<div>No results</div>
								<span>
									To get more results, try adjusting your
									search by changing your dates
								</span>

								<div className="divider" />
							</div>
						) : (
							data?.basicSearch?.listings
								.map((listing) => {
									if (!listing) return "";
									return (
										<SearchResultsItem
											key={listing.id}
											cloudinary={cloudinary}
											listing={listing}
											checkIn={checkIn}
											checkOut={checkOut}
										/>
									);
								})
								?.slice(
									(currentPage - 1) * 10,
									((currentPage - 1) * 10) + 10
								)
								// This slice essentially acts as your 'read' within typePolicies 
						)}
					</ul>

					{(data?.basicSearch?.count || 0) > 10 && (
						<SearchResultsPagination
							count={data?.basicSearch?.count || 0}
							currentPage={currentPage}
							handlePageClick={handlePageClick}
						/>
					)}
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
