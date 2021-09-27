import React from "react";

interface Props {
	handleCloseForm: () => void;
}

const TagsEditMenu = ({ handleCloseForm }: Props) => {
	return (
		<div className="TagsEditMenu">
			<button onClick={handleCloseForm}>x</button>
			<div className="TagsEditMenu__private">
				<h2>Type of Place</h2>

				<div>
					<div>
						<label htmlFor="entire-place">
							<div>Entire place</div>
							<div>Have a place to yourself</div>
						</label>
						<input
							id="entire-place"
							name="entire"
							type="radio"
							value="true"
						/>
					</div>
					<div>
						<label htmlFor="private-place">
							<div>Private room</div>
							<div>
								Have your own room and share some common spaces
							</div>
						</label>
						<input
							id="private-place"
							name="entire"
							type="radio"
							value="false"
						/>
					</div>
				</div>
			</div>
			<div className="TagsEditMenu__superhost"></div>
			<div className="TagsEditMenu__amenities"></div>
			<div className="TagsEditMenu__facilities"></div>
			<div className="TagsEditMenu__listing-types"></div>
			<div className="TagsEditMenu__house-rules"></div>
			<div className="TagsEditMenu__host-language"></div>
		</div>
	);
};

export default TagsEditMenu;
