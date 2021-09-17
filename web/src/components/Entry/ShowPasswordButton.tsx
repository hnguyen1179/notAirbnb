import React from "react";

interface Props {
	showPassword: boolean;
	handleClick: () => void;
}

function ShowPasswordButton({ showPassword, handleClick }: Props) {
	return (
		<button
			className="ShowPasswordButton-container"
			type="button"
			onClick={handleClick}
		>
			{showPassword ? "hide" : "show"}
		</button>
	);
}

export default ShowPasswordButton;
