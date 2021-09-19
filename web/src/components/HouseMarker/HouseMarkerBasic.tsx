import { ReactComponent as HouseSvg } from "../../assets/icons/house.svg";

interface Props {
	lat: number;
	lng: number;
}

const HouseMarkerBasic = (props: Props) => {
	return (
		<div className="HouseMarker HouseMarker--basic">
			<div className="HouseMarker__bubble">
				<div className="HouseMarker__svg">
					<HouseSvg />
				</div>
				<div className="HouseMarker__bubble__square" />
			</div>
		</div>
	);
};

export default HouseMarkerBasic;
