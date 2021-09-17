import React from "react";
import { useModal } from "../../context/ModalContext";
import EntryForm from "./EntryForm";

function Entry() {
	const { demoClicked } = useModal();

	return (
		<div className="EntryFormContainer">
			<EntryForm />
			<div className={"cover" + (demoClicked ? " active" : "")}></div>
		</div>
	);
}

export default Entry;
