import React from "react";

interface Props {
	count: number;
	currentPage: number;
	handlePageClick: (e: React.MouseEvent<HTMLLIElement>) => void;
}

const SearchResultsPagination = ({
	count,
	currentPage,
	handlePageClick,
}: Props) => {
	const numPages = Math.ceil(count / 10);
	const pages = Array.apply(null, Array(numPages)).map(function (x, i) {
		return i + 1;
	});

	return (
		<div className="SRP">
			<ol className="SRP__list">
				{pages.map((i) => {
					return (
						<li
							key={i}
							className="SRP__list__item"
							aria-current={i === currentPage}
							onClick={handlePageClick}
						>
							<button disabled={i === currentPage}>{i}</button>
						</li>
					);
				})}
			</ol>
		</div>
	);
};

export default SearchResultsPagination;
