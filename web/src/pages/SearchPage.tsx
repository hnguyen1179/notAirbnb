import {
	useContext,
	useState,
	useEffect,
	MouseEvent,
	useRef,
	useMemo,
} from "react";
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
import { URLParamsProvider } from "../context/URLParamsContext";

interface Props {
	history: History<any>;
}

export interface BasicSearchVariables {
	region: string;
	guests: number;
	checkIn: string;
	checkOut: string;
	tags: string[];
	listingType: string[];
	languages: string[];
	smoking: boolean;
	pets: boolean;
	superhost: boolean;
	entire: boolean;
	privateListing: boolean;
	offset: number;
}

const SearchPage = ({ history }: Props) => {
	const searchParams = useMemo(
		() => new URLSearchParams(history.location.search),
		[history.location.search]
	);

	const { cloudinary, mobile } = useContext(AppContext);

	const [openFilter, setOpenFilter] = useState(false);

	// Searches done via landing "region" icons
	const isRegionSearch = !history.location.search.includes("guests");
	// Helps prevent unnecessary data fetches
	const previousURL = useRef(searchParams.toString());

	const variables: BasicSearchVariables = useMemo(
		() => ({
			region: searchParams.get("region") as string,
			guests: parseInt(searchParams.get("guests") as string),
			checkIn: searchParams.get("check-in") as string,
			checkOut: searchParams.get("check-out") as string,
			tags: (searchParams.get("tags") as string)?.split(";"),
			listingType: (searchParams.get("listingType") as string)?.split(
				";"
			),
			languages: (searchParams.get("languages") as string)?.split(";"),
			smoking: searchParams.get("smoking") === "true",
			pets: searchParams.get("pets") === "true",
			superhost: searchParams.get("superhost") === "true",
			entire: searchParams.get("entire") === "true",
			privateListing: searchParams.get("privateListing") === "true",
			offset: (parseInt(searchParams.get("page") as string) - 1) * 10,
		}),
		[searchParams]
	);

	const { loading, error, data, fetchMore } = useBasicSearchQuery({
		variables,
	});

	useEffect(() => {
		// Skip any unnecessary data fetches
		if (searchParams.toString() === previousURL.current) return;
		previousURL.current = searchParams.toString();

		// Any time the url params changes, it'll fetch a new dataset
		// const currentPage = parseInt(searchParams.get("page") as string);
		(async () =>
			fetchMore({
				variables,
			}))();
	}, [fetchMore, searchParams, variables]);

	const renderListings = useMemo(() => {
		return data?.basicSearch?.listings.map((listing) => {
			if (!listing) return "";
			return (
				<SearchResultsItem
					key={listing.id}
					cloudinary={cloudinary}
					listing={listing}
					checkIn={new Date(variables.checkIn)}
					checkOut={new Date(variables.checkOut)}
				/>
			);
		});
	}, [
		variables.checkIn,
		variables.checkOut,
		cloudinary,
		data?.basicSearch?.listings,
	]);

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
		const nextSearch = new URLSearchParams(history.location.search);
		window.scrollTo({ top: 0 });
		nextSearch.set("page", nextPage.toString());

		history.push({
			pathname: history.location.pathname,
			search: nextSearch.toString(),
		});
	};

	const searchDetails = isRegionSearch
		? "Add dates"
		: `${format(new Date(variables.checkIn), "MMM d")} –
								${format(new Date(variables.checkOut), "MMM d")}${
				format(new Date(variables.checkOut), "yyyy") === "2022"
					? ", 2022 "
					: " "
		  }· ${variables.guests} guest${variables.guests === 1 ? "" : "s"}`;

	const generateCategory = () => {
		if (variables.listingType?.includes("Entire residential home")) {
			return "Entire homes";
		} else if (variables.pets) {
			return "Pets allowed";
		} else if (variables.tags?.includes("Summer")) {
			return "Summer stays";
		} else if (variables.tags?.includes("Nature")) {
			return "Nature getaways";
		}
	};

	const renderRegion = () => {
		if (!variables.region) {
			return generateCategory();
		} else if (variables.region === "Anywhere") {
			return "Stays anywhere";
		} else {
			return `Stays in ${variables.region}`;
		}
	};

	return (
		<URLParamsProvider
			history={history}
			variables={variables}
			openFilter={openFilter}
			setOpenFilter={setOpenFilter}
		>
			<div className="SearchPage">
				<SearchPageTopBar
					mobile={mobile}
					searchDetails={searchDetails}
					handleBack={handleBack}
				/>

				<div className="SearchPage-container">
					<div className="SearchPage__results-details">
						<span>
							{data?.basicSearch?.count} stays{" "}
							{isRegionSearch ? "" : `· ${searchDetails}`}
						</span>
						<h1>{renderRegion()}</h1>
					</div>

					<button
						className="SearchPage__button-filter"
						onClick={() => setOpenFilter(true)}
					>
						<div>Filters</div>
					</button>

					<div className="SearchPage__results">
						<ul className="SearchPage__results__list">
							{data?.basicSearch?.count === 0 && (
								<div className="no-results">
									<div>No results</div>
									<span>
										To get more results, try adjusting your
										search by changing your dates
									</span>

									<div className="divider" />
								</div>
							)}
							{renderListings}
						</ul>

						{(data?.basicSearch?.count || 0) > 10 && (
							<SearchResultsPagination
								count={data?.basicSearch?.count || 0}
								currentPage={
									parseInt(
										searchParams.get("page") as string
									) || 1
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
		</URLParamsProvider>
	);
};

export default SearchPage;
