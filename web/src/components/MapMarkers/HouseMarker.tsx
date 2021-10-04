import { ReactComponent as HouseSvg } from "../../assets/icons/house.svg";

interface Props {
	lat: number;
	lng: number;
	details: string;
}

const HouseMarker = ({ details }: Props) => {
	return (
		<div className="HouseMarker">
			<div className="HouseMarker__bubble">
				<div className="HouseMarker__svg">
					<HouseSvg />
				</div>
				<div className="HouseMarker__bubble__square" />
			</div>

			<div className="HouseMarker__text">
				<div>Where you stayed</div>
				<div>{details}</div>
			</div>
		</div>
	);
};

export default HouseMarker;
