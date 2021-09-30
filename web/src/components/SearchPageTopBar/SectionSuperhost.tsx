import React from "react";

interface Props {
	superhostChecked: boolean;
	handleToggleBooleanField: React.ChangeEventHandler<HTMLInputElement>;
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
							value="superhost"
							checked={superhostChecked}
							onChange={handleToggleBooleanField}
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
