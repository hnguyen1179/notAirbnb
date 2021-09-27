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

interface Props {
	history: History<any>;
}

const SearchPage = ({ history }: Props) => {
	const searchParams = new URLSearchParams(history.location.search);
	const [openFilter, setOpenFilter] = useState(false);

	const previousURL = useRef(searchParams.toString());
	// Searches done via landing "region" icons
	const isRegionSearch = !history.location.search.includes("guests");
	const { cloudinary, mobile } = useContext(AppContext);

	const region = searchParams.get("region") as string;
	const guests = parseInt(searchParams.get("guests") as string);
	const checkIn = searchParams.get("check-in") as string;
	const checkOut = searchParams.get("check-out") as string;
	const tags = (searchParams.get("tags") as string)?.split(";");
	const listingType = (searchParams.get("listingType") as string)?.split(";");
	const languages = (searchParams.get("languages") as string)?.split(";");
	const smoking = !!searchParams.get("smoking");
	const pets = !!searchParams.get("pets");
	const superhost = !!searchParams.get("superhost");
	const entire = !!searchParams.get("entire");

	const { loading, error, data, fetchMore } = useBasicSearchQuery({
		variables: {
			region,
			guests,
			checkIn,
			checkOut,
			offset: (parseInt(searchParams.get("page") as string) - 1) * 10,
			tags,
			listingType,
			languages,
			smoking,
			entire,
			pets,
			superhost,
		},
	});

	useEffect(() => {
		// Skip any unnecessary data fetches
		if (searchParams.toString() === previousURL.current) return;
		previousURL.current = searchParams.toString();

		// Any time the url params changes, it'll fetch a new dataset
		const currentPage = parseInt(searchParams.get("page") as string);
		(async () =>
			fetchMore({
				variables: {
					region,
					guests,
					checkIn,
					checkOut,
					offset: (currentPage - 1) * 10,
					tags,
					listingType,
					languages,
					smoking,
					pets,
					superhost,
				},
			}))();
	}, [
		checkIn,
		checkOut,
		fetchMore,
		guests,
		languages,
		listingType,
		pets,
		region,
		searchParams,
		smoking,
		superhost,
		tags,
	]);

	const renderListings = useMemo(() => {
		return data?.basicSearch?.listings.map((listing) => {
			if (!listing) return "";
			return (
				<SearchResultsItem
					key={listing.id}
					cloudinary={cloudinary}
					listing={listing}
					checkIn={new Date(checkIn)}
					checkOut={new Date(checkOut as string)}
				/>
			);
		});
	}, [checkIn, checkOut, cloudinary, data?.basicSearch?.listings]);

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
		: `${format(new Date(checkIn), "MMM d")} –
								${format(new Date(checkOut), "MMM d")}${
				format(new Date(checkOut), "yyyy") === "2022" ? ", 2022 " : " "
		  }· ${guests} guest${guests === 1 ? "" : "s"}`;

	const generateCategory = () => {
		if (listingType?.includes("Entire residential home")) {
			return "Entire homes";
		} else if (pets) {
			return "Pets allowed";
		} else if (tags?.includes("Summer")) {
			return "Summer stays";
		} else if (tags?.includes("Nature")) {
			return "Nature getaways";
		}
	};

	const renderRegion = () => {
		if (!region) {
			return generateCategory();
		} else if (region === "Anywhere") {
			return "Stays anywhere";
		} else {
			return `Stays in ${region}`;
		}
	};

	const URLParams = {
		region,
		guests,
		checkIn,
		checkOut,
	}

	return (
		<div className="SearchPage">
			<SearchPageTopBar
				mobile={mobile}
				URLParams={URLParams}
				searchDetails={searchDetails}
				history={history}
				openFilter={openFilter}
				setOpenFilter={setOpenFilter}
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
