import { useContext, useState, useEffect, MouseEvent } from "react";
import { History } from "history";
import { useBasicSearchQuery } from "../generated/graphql";
import { AppContext } from "../context/AppContext";
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
	const searchParams = new URLSearchParams(history.location.search);
	const isRegionSearch = !history.location.search.includes("guests");
	const { cloudinary, mobile } = useContext(AppContext);
	const [ isLoading, setIsLoading ] = useState(false);

	console.log("guests: ", searchParams.get("guests"));
	// const region = parsed.region as string;
	// const checkIn = new Date(parsed["check-in"] as string);
	// const checkOut = new Date(parsed["check-out"] as string);
	// const numGuests = parseInt(parsed.guests as string);

	const region = searchParams.get("region") as string;
	const guests = parseInt(searchParams.get("guests") as string);
	const checkIn = searchParams.get("check-in") as string;
	const checkOut = searchParams.get("check-out") as string;

	console.log(region, guests, checkIn, checkOut);

	const { loading, error, data, fetchMore } = useBasicSearchQuery({
		variables: {
			region,
			guests,
			checkIn,
			checkOut,
			offset: (parseInt(searchParams.get("page") as string) - 1) * 10,
		},
	});

	useEffect(() => {
		// Any time the url params change, it'll fetch a new dataset
		const currentPage = parseInt(searchParams.get("page") as string);
		setIsLoading(true);
		fetchMore({
			variables: {
				region,
				guests,
				checkIn,
				checkOut,
				offset: (currentPage - 1) * 10,
			},
		});
		setIsLoading(false);
	}, [searchParams]);

	if (error) {
		console.log(JSON.stringify(error, null, 2));
		return <>uh oh</>;
	}

	if (loading || isLoading)
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
		const nextSearch = new URLSearchParams(history.location.search);
		window.scrollTo({ top: 0 });
		nextSearch.set("page", nextPage.toString());

		history.push({
			pathname: history.location.pathname,
			search: nextSearch.toString(),
		});
	};

	const handleEditSearch = () => {};
	const handleEditFilter = () => {};

	const searchDetails = isRegionSearch
		? "Add dates"
		: `${format(new Date(checkIn), "MMM d")} –
								${format(new Date(checkOut), "MMM d")}${
				format(new Date(checkOut), "yyyy") === "2022" ? ", 2022 " : " "
		  }· ${guests} guest${guests === 1 ? "" : "s"}`;

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
						{data?.basicSearch?.count} stays{" "}
						{isRegionSearch ? "" : `· ${searchDetails}`}
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
							data?.basicSearch?.listings.map((listing) => {
								if (!listing) return "";
								return (
									<SearchResultsItem
										key={listing.id}
										cloudinary={cloudinary}
										listing={listing}
										checkIn={new Date(checkIn as string)}
										checkOut={new Date(checkOut as string)}
									/>
								);
							})
							// This slice essentially acts as your 'read' within typePolicies
						)}
					</ul>

					{(data?.basicSearch?.count || 0) > 10 && (
						<SearchResultsPagination
							count={data?.basicSearch?.count || 0}
							currentPage={
								parseInt(searchParams.get("page") as string) ||
								1
							}
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
