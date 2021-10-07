import React from "react";
import { ReactComponent as SuperhostSvg } from "../../assets/icons/super.svg";
import { ReactComponent as VerifiedSvg } from "../../assets/icons/filled-shield.svg";

interface Props {
	medal: string;
}

const Medal = (props: Props) => {
	const SVG = /superhost/i.test(props.medal) ? (
		<SuperhostSvg />
	) : (
		<VerifiedSvg />
	);

	return (
		<li className="Medal">
			{SVG}
			<span>{props.medal}</span>
		</li>
	);
};

export default Medal;
