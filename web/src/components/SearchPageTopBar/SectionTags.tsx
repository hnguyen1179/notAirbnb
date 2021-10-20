import { ChangeEvent, useState } from "react";
import { ReactComponent as CheckmarkSvg } from "../../assets/icons/checkmark.svg";
import { ArrayField } from "./FiltersEditMenu";
import SectionHeaderDropdown from "./SectionHeaderDropdown";
import SectionContent from "./SectionContent";
// These are the values;
const amenitiesValues = [
	"Kitchen", 
	"Air conditioning", 
	"Washer", 
	"Dryer", 
	"Wifi", 
	"TV", // search via CAPS TV or HDTV
	"Hair dryer", 
	"Refrigerator", 
	"Microwave", 
	"Workspace", 
	"Beach", // 'Summer Stays'
	"Backyard", 
	"Bathtub", 
	"Fireplace", 
];
// Amenities and Facilities are taken care of by "tags"
// Enums are how you filter for these tags
const amenitiesEnum = [
	"Kitchen",
	"Air conditioning",
	"Washer",
	"Dryer",
	"Wifi",
	"TV",
	"Hair dryer",
	"Refrigerator",
	"Microwave",
	"Dedicated Workspace", // Checks for Workspace tag
	"Beachfront", // Checks for Beach tag
	"Backyard",
	"Bathtub",
	"Fireplace",
];
const facilities = ["Free parking", "Hot tub", "Pool", "EV Charger"];

interface Props {
	tags: string[];
	handleToggleArrayField: (
		e: ChangeEvent<HTMLInputElement>,
		field: ArrayField
	) => void;
}

const SectionTags = ({ tags = [], handleToggleArrayField }: Props) => {
	const [isOpen, setIsOpen] = useState({
		amenities: false,
		facilities: false,
	});

	const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
		handleToggleArrayField(e, "tags");
	};

	const handleClickDropdownAmenities = () => {
		setIsOpen({
			...isOpen,
			amenities: !isOpen.amenities,
		});
	};

	const handleClickDropdownFacilities = () => {
		setIsOpen({
			...isOpen,
			facilities: !isOpen.facilities,
		});
	};

	return (
		<>
			<div>
				<SectionHeaderDropdown
					title={"Amenities"}
					isOpen={isOpen.amenities}
					handleClickDropdown={handleClickDropdownAmenities}
				/>

				{/* CSSTransition within SectionContent */}
				<SectionContent isOpen={isOpen.amenities}>
					<div className="FiltersEditMenu__section__content">
						{amenitiesEnum.map((value, idx) => {
							const id = `tag-${value.replaceAll(" ", "-")}`;

							return (
								<div key={id} className="type">
									<label htmlFor={id}>
										<div>{value}</div>
									</label>
									<div className="checkbox-container">
										<input
											id={id}
											type="checkbox"
											checked={tags.includes(
												amenitiesValues[idx]
											)}
											value={amenitiesValues[idx]}
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
			</div>

			<hr className="divider" />

			<div>
				<SectionHeaderDropdown
					title={"Facilities"}
					isOpen={isOpen.facilities}
					handleClickDropdown={handleClickDropdownFacilities}
				/>
				<SectionContent isOpen={isOpen.facilities}>
					<div className="FiltersEditMenu__section__content">
						{facilities.map((value) => {
							const id = `tag-${value.replaceAll(" ", "-")}`;

							return (
								<div key={id} className="type">
									<label htmlFor={id}>
										<div>{value}</div>
									</label>
									<div className="checkbox-container">
										<input
											id={id}
											type="checkbox"
											checked={tags.includes(value)}
											value={value}
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
			</div>
		</>
	);
};

export default SectionTags;
