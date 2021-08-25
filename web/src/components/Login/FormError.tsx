import React from "react";
import { ReactComponent as ErrorSvg } from "../../assets/svgs/error.svg";

interface Props {
	error: string | undefined;
	redirect?: any;
}

function FormError({ error, redirect }: Props) {

	if (!error) return <></>

	// For email errors from the server
	if (error === "User with this email already exists") {
		return <span>This email already exists. <button onClick={redirect}>Log in?</button></span>;
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
