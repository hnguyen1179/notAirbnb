import { useState } from "react";
import { useReviewsByHostIdQuery } from "../generated/graphql";

const useFetchHostReviews = (id: string) => {
	const [fetchLoading, setfetchLoading] = useState(false);

	const { error, data, fetchMore } = useReviewsByHostIdQuery({
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
				offset: data?.reviewsByHostId.length,
			},
		});
		setfetchLoading(false);
	};

	return { error, data, handleFetchMore, fetchLoading };
};

export { useFetchHostReviews };
