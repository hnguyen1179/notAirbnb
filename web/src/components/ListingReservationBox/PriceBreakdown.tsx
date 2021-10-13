import React from "react";
import { IPriceBreakdown } from "../../utils/priceBreakdown";

interface Props {
	priceBreakdown: IPriceBreakdown;
}

const PriceBreakdown = ({ priceBreakdown }: Props) => {
	return (
    <div className="PriceBreakdown">
      <div className="PriceBreakdown__disclaimer">
        <span>You won't be charged. Like, at all</span>
      </div>

			<div className="PriceBreakdown__category PriceBreakdown__category--nights">
				<div className="PriceBreakdown__category__title">
					<span>
						${priceBreakdown.pricePerNight} x{" "}
						{priceBreakdown.totalNights > 1
							? priceBreakdown.totalNights + " nights"
							: priceBreakdown.totalNights + " night"}
					</span>
				</div>
				<div className="PriceBreakdown__category__cost">
					<span>${priceBreakdown.price}</span>
				</div>
			</div>
			<div className="PriceBreakdown__category PriceBreakdown__category--service">
				<div className="PriceBreakdown__category__title">
					<span>Service fee</span>
				</div>
				<div className="PriceBreakdown__category__cost">
					<span>${priceBreakdown.serviceFee.toFixed(0)}</span>
				</div>
			</div>

			{priceBreakdown.cleaningFee ? (
				<div className="PriceBreakdown__category PriceBreakdown__category--cleaning">
					<div className="PriceBreakdown__category__title">
						<span>Cleaning fee</span>
					</div>
					<div className="PriceBreakdown__category__cost">
						<span>${priceBreakdown.cleaningFee.toFixed(0)}</span>
					</div>
				</div>
			) : null}

			{priceBreakdown.occupancyTax ? (
				<div className="PriceBreakdown__category PriceBreakdown__category--tax">
					<div className="PriceBreakdown__category__title">
						<span>Occupancy Tax</span>
					</div>
					<div className="PriceBreakdown__category__cost">
						<span>${priceBreakdown.occupancyTax.toFixed(0)}</span>
					</div>
				</div>
			) : null}

			<div className="divider"></div>

			<div className="PriceBreakdown__category PriceBreakdown__category--total">
				<div className="PriceBreakdown__category__title">
					<span>Total</span>
				</div>
				<div className="PriceBreakdown__category__cost">
					<span>{priceBreakdown.totalPrice}</span>
				</div>
			</div>
		</div>
	);
};

export default PriceBreakdown;
