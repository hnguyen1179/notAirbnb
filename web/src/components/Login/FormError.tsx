import React from "react";
import { ReactComponent as ErrorSvg } from "../../assets/svgs/error.svg";

interface Props {
	error: string | undefined;
}

function FormError({ error }: Props) {

	if (!error) return <></>

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
