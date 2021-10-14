import { ReactComponent as CloseSvg } from "../../assets/icons/bold-negative.svg";

interface Props {
	listingDescription: string;
	closePortal: () => void;
}

const ShowListingDescription = (props: Props) => {
	return (
		<div className="ShowListingDescription">
			<nav className="ShowListingDescription__nav">
				<button onClick={props.closePortal}>
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
