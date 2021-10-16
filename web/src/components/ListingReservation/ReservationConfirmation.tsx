import BoxButtons from "../ListingReservationBox/BoxButtons";
import { IDate } from "../MobileNavbar/MobileSearchForm";

/**
 *  TODO:
 *  3.  Create functionality for actually creating a reservation object and
 *      adding that object onto the current user's future reservations
 *         - Create authorization routes in order to prevent unauthorized
 *           people from accessing links for Trips and TripsPage that they
 *           don't have access to
 * 				 - Maybe have an outer route that runs a mutation similar to 
 * 					 verifyEmail, in which in returns a boolean which checks if that
 * 					 user has that actual reservation in trip/:reservationId / or if that user's id is 
 * 					 equal to the id in the trips/:userId
 * 
 *  3a. Add a cancel reservation feature in trip page
 *
 *  FRIDAY EOD...
 *
 *  4.  Write documentation and maybe write some tests for major components only
 *
 *  5.  Fix major bugs and delete all console logs
 *         - Log in bug being a major bug
 *
 *  SUNDAY EOD ...
 *
 *  6.  DEPLOY
 *
 *  7.  Add to online portfolio, write the README, and add to Resume
 *         - Make sure to say that the Reviews writing system will be implemented in the future
 *
 *  8.  Update the resume link in the notAirbnb project to include new resume
 *
 *  MONDAY EOD ...
 *
 */

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
