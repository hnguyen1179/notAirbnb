import { ReactComponent as CloseSvg } from "../../assets/icons/bold-negative.svg";

interface Props {
	listingDescription: string;
}

const ShowListingDescription = (props: Props) => {
	return (
		<div className="ShowListingDescription">
			<nav className="ShowListingDescription__nav">
				<button>
					<CloseSvg />
				</button>
			</nav>
			<div className="ShowListingDescription__container">
				<p>{props.listingDescription}</p>
			</div>
		</div>
	);
};

export default ShowListingDescription;
