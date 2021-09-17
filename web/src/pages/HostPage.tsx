import React from "react";

interface Props {
	id: string;
	renderProps: any;
}

const HostPage = ({ id, renderProps }: Props) => {
	return (
		<div>
			<h1>Hi, this is host page</h1>
			<h2>My host ID is {id}</h2>
		</div>
	);
};

export default HostPage;
