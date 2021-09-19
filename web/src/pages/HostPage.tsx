import { useContext } from "react";
import { AppContext } from "../context/AppContext";

import Navbar from "../components/Navbar/Navbar";
import { useFetchHostReviews } from "../hooks/useFetchHostReviews";
import { useHostByIdQuery } from "../generated/graphql";

interface Props {
	id: string;
	renderProps: any;
}

const HostPage = ({ id, renderProps }: Props) => {
	const { cloudinary, mobile } = useContext(AppContext);
	// const { loading, error, data } = useUser
	const { loading, error, data } = useHostByIdQuery({ variables: { id } });

	const {
		error: reviewsError,
		data: reviewsData,
		handleFetchMore,
		fetchLoading,
	} = useFetchHostReviews(id);

	console.log(data);

	return (
		<div className="HostPage">
			{!mobile && (
				<>
					<Navbar notLanding={true} />
					<div className="Navbar-filler"></div>
				</>
			)}

			<h1>Hi, this is host page</h1>
			<h2>My host ID is {id}</h2>
		</div>
	);
};

export default HostPage;
