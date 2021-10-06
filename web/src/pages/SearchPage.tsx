import {
	useState,
	useEffect,
	MouseEvent,
	useRef,
	useMemo,
} from "react";
import { History } from "history";
import { useBasicSearchQuery } from "../generated/graphql";
import { useAppState } from "../context/AppContext";
import SearchPageTopBar from "../components/SearchPageTopBar/SearchPageTopBar";
import Loading from "../components/Loading";
import { format } from "date-fns";
import Footer from "../components/Footer/Footer";
import MobileNavbar from "../components/MobileNavbar/MobileNavbar";
import SearchResultsItem from "../components/SearchResultsItem/SearchResultsItem";
import SearchResultsPagination from "../components/SearchResultsPagination/SearchResultsPagination";
import { useURLParams } from "../context/URLParamsContext";
import Navbar from "../components/Navbar/Navbar";
import { CSSTransition } from "react-transition-group";
import EditMenuPortal from "../components/SearchPageTopBar/EditMenuPortal";
import SearchPageMap from "../components/SearchPageMap/SearchPageMap";

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
	const { cloudinary, mobile, map } = useAppState();
	const {
		state: { editMenu },
		variables,
		handleOpenEditMenu,
		activeNumFilters,
	} = useURLParams();
	const [currentListing, setCurrentListing] = useState(-1);
	const [isLoading, setIsLoading] = useState(false);

	const filtersEditMenuRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<HTMLDivElement>(null);

	// Searches done via landing "region" icons
	const isRegionSearch = !history.location.search.includes("guests");
	const searchParams = new URLSearchParams(history.location.search);

	// Helps prevent unnecessary data fetches
	const previousURL = useRef(searchParams.toString());

	const { loading, error, data, fetchMore } = useBasicSearchQuery({
		variables,
	});

	useEffect(() => {
		if (!searchParams.toString().includes("guests")) {
			localStorage.removeItem("params");
		}
	}, [searchParams]);

	useEffect(() => {
		// Skip any unnecessary data fetches
		if (searchParams.toString() === previousURL.current) return;
		previousURL.current = searchParams.toString();

		setIsLoading(true);
		// Any time the url params changes, it'll fetch a new dataset
		// const currentPage = parseInt(searchParams.get("page") as string);
		(async () =>
			fetchMore({
				variables,
			}))();

		setIsLoading(false);
	}, [fetchMore, searchParams, variables]);

	const renderListings = useMemo(() => {
		return data?.basicSearch?.listings.map((listing, idx) => {
			if (!listing) return "";

			return (
				<div
					key={listing.id}
					onMouseEnter={(e) => {
						setCurrentListing(idx);
					}}
					onMouseLeave={(e) => {
						setCurrentListing(-1);
					}}
				>
					<SearchResultsItem
						cloudinary={cloudinary}
						mobile={mobile}
						listing={listing}
						checkIn={new Date(variables.checkIn)}
						checkOut={new Date(variables.checkOut)}
					/>
				</div>
			);
		});
	}, [
		data?.basicSearch?.listings,
		cloudinary,
		mobile,
		variables.checkIn,
		variables.checkOut,
	]);

	const renderMap = useMemo(() => {
		return (
			<SearchPageMap
				listings={data?.basicSearch?.listings}
				currentListing={currentListing}
				region={variables.region}
				mapRef={mapRef}
				cloudinary={cloudinary}
			/>
		);
	}, [
		cloudinary,
		currentListing,
		data?.basicSearch?.listings,
		variables.region,
	]);

	const handleBack = () => {
		history.goBack();
	};

	const handlePageClick = async (e: MouseEvent<HTMLLIElement>) => {
		const nextPage = parseInt(e?.currentTarget?.innerText);
		const nextSearch = new URLSearchParams(history.location.search);
		nextSearch.set("page", nextPage.toString());

		history.push({
			pathname: history.location.pathname,
			search: nextSearch.toString(),
		});

		window.scrollTo({ top: 0 });
	};

	const handleClickOpenFilter = (e: MouseEvent) => {
		e.stopPropagation();
		handleOpenEditMenu("filters");
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

	// TODO: Maybe have a dedicated error page?
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

	return (
		<div className="SearchPage">
			{mobile ? (
				<SearchPageTopBar
					searchDetails={searchDetails}
					handleBack={handleBack}
				/>
			) : (
				<>
					<Navbar
						notLanding={true}
						searchPage={true}
						searchDetails={searchDetails}
						location={variables.region}
					/>
					<div className="Navbar-filler" />
					<div
						className="edit-menu-portal-background"
						aria-hidden={editMenu.filters}
					/>
					<CSSTransition
						in={editMenu.filters}
						timeout={300}
						classNames="edit-menu-filter"
						unmountOnExit
						nodeRef={filtersEditMenuRef}
					>
						<EditMenuPortal menuRef={filtersEditMenuRef} />
					</CSSTransition>
				</>
			)}

			<div className="SearchPage-outer">
				<div className="SearchPage-container">
					<div className="SearchPage__results-details">
						<span>
							{data?.basicSearch?.count} stays{" "}
							{isRegionSearch ? "" : `· ${searchDetails}`}
						</span>
						<h1>{renderRegion()}</h1>
					</div>

					<button
						className={`SearchPage__button-filter ${
							activeNumFilters > 0 ? "filtered" : ""
						}`}
						onClick={handleClickOpenFilter}
					>
						{activeNumFilters > 0 ? (
							<div>Filters · {activeNumFilters}</div>
						) : (
							<div>Filters</div>
						)}
					</button>

					<div className="SearchPage__results">
						<ul
							className={`SearchPage__results__list ${
								(data?.basicSearch?.count || 0) < 10
									? "underline"
									: ""
							}`}
						>
							{data?.basicSearch?.count === 0 && (
								<div className="no-results">
									<div>No results</div>
									<span>
										To get more results, try adjusting your
										search by changing your dates or
										removing filters
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
				<div className="google-maps-container">
					<aside className="map" ref={mapRef}>
						{map && renderMap}
					</aside>
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
