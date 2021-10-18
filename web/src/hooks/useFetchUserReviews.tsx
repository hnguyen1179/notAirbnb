import { useState } from "react";
import { useReviewsByUserIdQuery } from "../generated/graphql";

const useFetchUserReviews = (id: string) => {
	const [fetchLoading, setfetchLoading] = useState(false);

	const { error, data, fetchMore } = useReviewsByUserIdQuery({
		variables: {
			id,
			offset: 0,
		},
	});

	const handleFetchMore = async () => {
		setfetchLoading(true);
		await fetchMore({
			variables: {
				id,
				offset: data?.reviewsByUserId.length,
			},
		});
		setfetchLoading(false);
	};

	return { error, data, handleFetchMore, fetchLoading };
};

export { useFetchUserReviews };
