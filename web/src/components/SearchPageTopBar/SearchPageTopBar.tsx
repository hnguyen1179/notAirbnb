import { ReactComponent as BackSvg } from "../../assets/icons/back.svg";
import { ReactComponent as FilterSvg } from "../../assets/icons/filter.svg";

import Navbar from "../Navbar/Navbar";

interface Props {
	mobile: boolean;
	region: string;
	searchDetails: string;
	handleBack: () => void;
	handleEditSearch: () => void;
	handleEditFilter: () => void;
}

const SearchPageTopBar = ({
	mobile,
	region,
	searchDetails,
	handleBack,
	handleEditSearch,
	handleEditFilter,
}: Props) => {
	return (
		<div>
			{mobile ? (
				<>
					<div className="SearchPage__top-bar">
						<button
							className="button button--back"
							onClick={handleBack}
						>
							<BackSvg />
						</button>
						<button
							className="button button--edit-search"
							onClick={handleEditSearch}
						>
							<div className="region">{region}</div>
							<div className="date">{searchDetails}</div>
						</button>
						<button
							className="button button--edit-filter"
							onClick={handleEditFilter}
						>
							<FilterSvg />
						</button>
					</div>
					<div className="SearchPage__top-bar--filler" />
				</>
			) : (
				<>
					<Navbar notLanding={true} />
					<div className="Navbar-filler" />
				</>
			)}
		</div>
	);
};

export default SearchPageTopBar;
