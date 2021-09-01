import React from "react";
import { ReactComponent as ErrorSvg } from "../../assets/icons/error.svg";

interface Props {
	error: string | undefined;
	redirect?: any;
}

function FormError({ error, redirect }: Props) {
	if (!error) return <></>;

	// For email errors from the server
	if (error === "User with this email already exists") {
		return (
			<div className="FormError">
				<span>
					<ErrorSvg />
				</span>
				This email already exists.{" "}
				<button className="login-redirect-button" onClick={redirect}>Log in?</button>
			</div>
		);
	}

	return (
		<div className="FormError">
			<span>
				<ErrorSvg />
			</span>
			{error}
		</div>
	);
}

export default FormError;
