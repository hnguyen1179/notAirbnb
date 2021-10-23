interface Props {
	showPassword: boolean;
	handleClick: () => void;
}

function ShowPasswordButton({ showPassword, handleClick }: Props) {
	return (
		<button
			aria-label="Toggle Show Password Button"
			className="ShowPasswordButton-container"
			type="button"
			onClick={handleClick}
		>
			{showPassword ? "hide" : "show"}
		</button>
	);
}

export default ShowPasswordButton;
