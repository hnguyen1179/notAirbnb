import { ReactComponent as HouseSvg } from "../../assets/icons/house.svg";

interface Props {
	lat: number;
	lng: number;
	details: string;
	future: boolean;
}

const HouseMarker = ({ details, future }: Props) => {
	return (
		<div className="HouseMarker">
			<div className="HouseMarker__bubble">
				<div className="HouseMarker__svg">
					<HouseSvg />
				</div>
				<div className="HouseMarker__bubble__square" />
			</div>

			<div className="HouseMarker__text">
				<div>{future ? "Where you will stay" : "Where you stayed"}</div>
				<div>{details}</div>
			</div>
		</div>
	);
};

export default HouseMarker;
