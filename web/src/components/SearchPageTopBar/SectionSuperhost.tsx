import React from "react";
import { BooleanField } from "./FiltersEditMenu";

interface Props {
	superhostChecked: boolean;
	handleToggleBooleanField: (
		e: React.ChangeEvent<HTMLInputElement>,
		field: BooleanField
	) => void;
}

const SectionSuperhost = ({
	superhostChecked,
	handleToggleBooleanField,
}: Props) => {
	return (
		<>
			<h2>Superhost</h2>

			<div className="type">
				<label htmlFor="superhost">
					<span>Stay with recognized hosts</span>
					<div className="slider-container">
						<input
							id="superhost"
							type="checkbox"
							checked={superhostChecked}
							onChange={(e) =>
								handleToggleBooleanField(e, "superhost")
							}
						/>
						<div className="slider">
							<div className="slider-ball"> </div>
						</div>
					</div>
				</label>
			</div>
		</>
	);
};

export default SectionSuperhost;
