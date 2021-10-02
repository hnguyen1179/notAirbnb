import React from "react";

interface Props {
	lat: number;
	lng: number;
	price: string | number;
	$hover?: boolean;
}

const PriceMarker = ({ price, $hover }: Props) => {
	return (
		<div className="PriceMarker">
			<span>${price}</span>
		</div>
	);
};

export default PriceMarker;
