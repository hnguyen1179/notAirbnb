import React from "react";

interface Props {
	id: string;
}

const UserPage = (props: Props) => {
	console.log(" In users ");
	return <div>Hi, my id is {props.id}</div>;
};

export default UserPage;
