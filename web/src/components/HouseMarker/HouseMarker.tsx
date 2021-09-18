import { ReactComponent as HouseSvg } from "../../assets/icons/house.svg";

interface Props {
	lat: number;
	lng: number;
}

const HouseMarker = (props: Props) => {
	return (
		<div className="HouseMarker">
			<div className="HouseMarker__bubble">
				<div className="HouseMarker__svg">
					<HouseSvg />
				</div>
				<div className="HouseMarker__bubble__square" />
			</div>
		</div>
	);
};

export default HouseMarker;
