import React from "react";
import Loading from "../components/Loading";
import { useReservationByIdQuery } from "../generated/graphql";

interface Props {
	id: string;
	renderProps: any;
}

const TripPage = ({ id, renderProps }: Props) => {
	const { loading, error, data } = useReservationByIdQuery({
		variables: { id },
	});

	if (loading)
		return (
			<div className="page-loading">
				<Loading />
			</div>
		);

	if (error) {
		renderProps.history.push("/404");
	}

	console.log(data);

	return <div></div>;
};

export default TripPage;
