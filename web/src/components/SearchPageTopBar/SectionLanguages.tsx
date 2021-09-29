import { ChangeEvent, useState } from "react";
import { ReactComponent as CheckmarkSvg } from "../../assets/icons/checkmark.svg";
import { ArrayField } from "./FiltersEditMenu";
import SectionContent from "./SectionContent";
import SectionHeaderDropdown from "./SectionHeaderDropdown";

interface Props {
	languages: string[];
	handleToggleArrayField: (
		e: React.ChangeEvent<HTMLInputElement>,
		field: ArrayField
	) => void;
}

// Search in listing.languages
const languagesValues = [
	"Français",
	"Deutsch",
	"Italiano",
	"Русский",
	"Español",
	"中文 (简体)",
	"العربية",
	"हिन्दी",
	"Nederlands",
	"ਪੰਜਾਬੀ",
	"עברית",
	"Tagalog",
	"Svenska",
	"Norsk",
	"Українська",
];

const languagesEnum = [
	"French",
	"German",
	"Italian",
	"Russian",
	"Spanish",
	"Chinese (Simplified)",
	"Arabic",
	"Hindi",
	"Dutch",
	"Punjabi",
	"Hebrew",
	"Tagalog",
	"Swedish",
	"Norwegian",
	"Ukrainian",
];

const SectionLanguages = ({ languages, handleToggleArrayField }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleToggleArrayField(e, "languages");
	};

	const handleClickDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<SectionHeaderDropdown
				title={"Host language"}
				isOpen={isOpen}
				handleClickDropdown={handleClickDropdown}
			/>

			<SectionContent isOpen={isOpen}>
				<div className="FiltersEditMenu__section__content">
					{languagesEnum.map((language, idx) => {
						return (
							<div
								key={`language-${language.replaceAll(
									" ",
									"-"
								)}`}
								className="type"
							>
								<label
									htmlFor={`language-${language.replaceAll(
										" ",
										"-"
									)}`}
								>
									<div>{language}</div>
								</label>
								<div className="checkbox-container">
									<input
										id={`language-${language.replaceAll(
											" ",
											"-"
										)}`}
										type="checkbox"
										checked={languages.includes(
											languagesValues[idx]
										)}
										value={languagesValues[idx]}
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

export default SectionLanguages;
