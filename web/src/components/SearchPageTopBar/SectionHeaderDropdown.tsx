import { ReactComponent as CaretSvg } from "../../assets/icons/caret.svg";

interface Props {
	title: string;
	isOpen: boolean;
	handleClickDropdown: () => void;
}

const SectionHeaderDropdown = ({
	title,
	isOpen,
	handleClickDropdown,
}: Props) => {
	return (
		<button
			className="FiltersEditMenu__section__header"
			onClick={handleClickDropdown}
		>
			<h2>{title}</h2>
			<div className="show-features">
				<div className="caption">
					{isOpen
						? `Close ${title.toLowerCase()}`
						: `Show all ${title.toLowerCase()}`}
				</div>
				<CaretSvg className={`svg${isOpen ? " open" : ""}`} />
			</div>
		</button>
	);
};

export default SectionHeaderDropdown;
