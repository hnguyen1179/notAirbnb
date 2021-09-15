import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { userByIdQuery } from "../graphql/queries/userById";

interface Props {
	id: string;
}

const UserPage = ({ id }: Props) => {
	const { loading, error, data } = useQuery(userByIdQuery, {
		variables: { id },
	});

	if (loading) return <div> loading ... </div>;
	if (error) return <div>{error}</div>;

  const { firstName, lastName, dateJoined, email } = data.userById;
	return (
		<div>
      Hi, my name is ... {firstName} {lastName}
			{/* <h1>My name is {props.user.firstName}</h1> */}
		</div>
	);
};

export default UserPage;
