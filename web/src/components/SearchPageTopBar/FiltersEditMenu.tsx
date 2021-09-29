import React, { useState } from "react";
import { ReactComponent as BackSvg } from "../../assets/icons/back.svg";
import SectionEntire from "./SectionEntire";
import SectionSuperhost from "./SectionSuperhost";
import SectionTags from "./SectionTags";
import SectionListingTypes from "./SectionListingTypes";
import SectionLanguages from "./SectionLanguages";
import SectionRules from "./SectionRules";
import { useURLParams } from "../../context/URLParamsContext";

interface Props {
	handleCloseForm: () => void;
}

interface IFilter {
	entire: boolean;
	private: boolean;
	superhost: boolean;
	tags: string[];
	listingTypes: string[];
	pets: boolean;
	smoking: boolean;
	languages: string[];
}

const initialFilters = {
	entire: false,
	private: false,
	superhost: false,
	tags: [],
	listingTypes: [],
	pets: false,
	smoking: false,
	languages: [],
};

export type ArrayField = "tags" | "listingTypes" | "languages";
export type BooleanField = "superhost" | "pets" | "smoking";

const FiltersEditMenu = ({ handleCloseForm }: Props) => {
	const { state } = useURLParams();
	const [filters, setFilters] = useState<IFilter>(initialFilters);

	// for SectionEntire; toggles between both checkbox states
	const handleToggleEntire = (e: React.ChangeEvent<HTMLInputElement>) => {
		const field = e.currentTarget.value as "entire" | "private";
		const newFilters = {
			...filters,
		};
		newFilters[field] = !filters[field];
		setFilters(newFilters);
	};

	// for SectionSuperhost; toggles between superhost checkbox states
	const handleToggleBooleanField = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: BooleanField
	) => {
		setFilters({ ...filters, [field]: !filters[field] });
	};

	// for SectionTags, SectionListingTypes, SectionLanguages; toggles the item in and out of the array
	const handleToggleArrayField = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: ArrayField
	) => {
		const tag = e.currentTarget.value;
		const index = filters[field].indexOf(tag);
		const nextField = filters[field].slice();

		if (index > -1) {
			nextField.splice(index, 1);
		} else {
			nextField.push(tag);
		}

		return setFilters({ ...filters, [field]: nextField });
	};

	const resetFilters = () => {
		setFilters(initialFilters)
	}

	return (
		<div className="FiltersEditMenu">
			<header className="FiltersEditMenu__header">
				<button onClick={handleCloseForm}>
					<BackSvg />
				</button>

				<h1>Filters</h1>

				<button onClick={resetFilters}>
					<div>Clear</div>
				</button>
			</header>
			<div className="FiltersEditMenu__sections">
				<div className="FiltersEditMenu__section FiltersEditMenu__section--entire">
					<SectionEntire
						entireChecked={filters.entire}
						privateChecked={filters.private}
						handleToggleEntire={handleToggleEntire}
					/>
				</div>
				<div className="FiltersEditMenu__section FiltersEditMenu__section--superhost">
					<SectionSuperhost
						superhostChecked={filters.superhost}
						handleToggleBooleanField={handleToggleBooleanField}
					/>
				</div>
				<div className="FiltersEditMenu__section FiltersEditMenu__section--tags">
					<SectionTags
						tags={filters.tags}
						handleToggleArrayField={handleToggleArrayField}
					/>
				</div>
				<div className="FiltersEditMenu__section FiltersEditMenu__section--listing-types">
					<SectionListingTypes
						listingTypes={filters.listingTypes}
						handleToggleArrayField={handleToggleArrayField}
					/>
				</div>
				<div className="FiltersEditMenu__section FiltersEditMenu__section--rules">
					<SectionRules
						pets={filters.pets}
						smoking={filters.smoking}
						handleToggleBooleanField={handleToggleBooleanField}
					/>
				</div>
				<div className="FiltersEditMenu__section FiltersEditMenu__section--languages">
					<SectionLanguages
						languages={filters.languages}
						handleToggleArrayField={handleToggleArrayField}
					/>
				</div>
			</div>
			<footer className="FiltersEditMenu__submit">
				<button>
					<span>Show results</span>
				</button>
			</footer>
		</div>
	);
};

export default FiltersEditMenu;
