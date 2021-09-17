import { ReactComponent as MapSvg } from "../../assets/icons/map.svg";

interface Props {
	location: string;
	handleRadioSelect: (e: any) => void;
}

const RadioButton = ({ location, handleRadioSelect }: Props) => {

  return (
		<div className="radio">
			<button type="button" onClick={handleRadioSelect} value={location}>
				<div className="svg">
					<MapSvg />
				</div>
				<span>{location}</span>
			</button>
		</div>
	);
};

export default RadioButton;
