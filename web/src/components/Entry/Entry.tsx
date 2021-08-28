import React from "react";
import { useModal } from "../../context/ModalContext";
import AuthenticatedForm from "./AuthenticatedForm";

function Entry() {
	const { demoClicked } = useModal();

	return (
		<div className="EntryFormContainer">
			<AuthenticatedForm />
			<div
				className={"cover" + (demoClicked ? ' active' : '')}
			></div>
		</div>
	);
}

export default Entry;
