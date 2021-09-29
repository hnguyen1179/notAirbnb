import React, { useState } from "react";
import { ReactComponent as CheckmarkSvg } from "../../assets/icons/checkmark.svg";
import { ArrayField } from "./FiltersEditMenu";
import SectionContent from "./SectionContent";
import SectionHeaderDropdown from "./SectionHeaderDropdown";

// listingTypes
const listingTypesValues = [
	"Entire cabin",
	"Entire condominium (condo)",
	"Entire cottage",
	"Entire guest suite",
	"Entire guesthouse",
	"Entire rental unit",
	"Entire residential home",
	"Private room",
	"Entire serviced apartment",
	"Tiny house",
	"Entire villa",
];

const listingTypesEnums = [
	"Cabin",
	"Condominium (condo)",
	"Cottage",
	"Guest suite",
	"Guesthouse",
	"Rental unit",
	"Residential home",
	"Room",
	"Serviced apartment",
	"Tiny house",
	"Villa",
];

interface Props {
	listingTypes: string[];
	handleToggleArrayField: (
		e: React.ChangeEvent<HTMLInputElement>,
		field: ArrayField
	) => void;
}

const SectionListingTypes = ({
	listingTypes,
	handleToggleArrayField,
}: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleToggleArrayField(e, "listingTypes");
	};

	const handleClickDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<SectionHeaderDropdown
				title={"Property types"}
				isOpen={isOpen}
				handleClickDropdown={handleClickDropdown}
			/>

			<SectionContent isOpen={isOpen}>
				<div className="FiltersEditMenu__section__content">
					{listingTypesEnums.map((type, idx) => {
						return (
							<div
								key={`type-${type.replaceAll(" ", "-")}`}
								className="type"
							>
								<label
									htmlFor={`type-${type.replaceAll(
										" ",
										"-"
									)}`}
								>
									<div>{type}</div>
								</label>
								<div className="checkbox-container">
									<input
										id={`type-${type.replaceAll(" ", "-")}`}
										type="checkbox"
										checked={listingTypes.includes(
											listingTypesValues[idx]
										)}
										value={listingTypesValues[idx]}
										onChange={handleToggle}
									/>
									<span className="checkbox">
										<CheckmarkSvg />
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</SectionContent>
		</>
	);
};

export default SectionListingTypes;
