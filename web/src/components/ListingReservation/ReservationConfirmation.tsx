import BoxButtons from "../ListingReservationBox/BoxButtons";
import { IDate } from "../MobileNavbar/MobileSearchForm";
interface Props {
	id: string;
	dates: IDate;
	maxGuests: number;
	numGuests: number;
	price: number;
	cleaningFee: number;
	region: string;
	defaultDate: boolean;
}

const ReservationConfirmation = (props: Props) => {
	return (
		<div className="ReservationConfirmation">
			<h2>Your trip</h2>
			<BoxButtons {...props} />
		</div>
	);
};

export default ReservationConfirmation;
