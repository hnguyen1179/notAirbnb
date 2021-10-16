import { MouseEventHandler, useRef } from "react";
import { useHistory } from "react-router";
import { useAppState } from "../../context/AppContext";
import { useModal } from "../../context/ModalContext";

interface Props {
	datesPicked: boolean;
	handleClickCheckAvailability: () => void;
	handleClickReserve: MouseEventHandler<HTMLButtonElement>;
}

const ListingReservationMobileButton = (props: Props) => {
	const gradientRef = useRef<HTMLSpanElement>(null);
	const { user } = useAppState();
	const { getCursorPos } = useModal();
	const history = useHistory();

	const handleRedirectToLogin = () => {
		history.push("/entry");
	};

	if (!props.datesPicked) {
		return (
			<button
				className="ListingReservationMobile__button-container__button"
				onMouseMove={(e) => getCursorPos(e, gradientRef.current)}
				onClick={props.handleClickCheckAvailability}
			>
				<span className="gradient-container">
					<span className="gradient" ref={gradientRef}></span>
				</span>
				<span className="reserve-button-text">Check availability</span>
			</button>
		);
	}

	if (!user) {
		return (
			<button
				className="ListingReservationMobile__button-container__button"
				onMouseMove={(e) => getCursorPos(e, gradientRef.current)}
				onClick={handleRedirectToLogin}
			>
				<span className="gradient-container">
					<span className="gradient" ref={gradientRef}></span>
				</span>
				<span className="reserve-button-text">Log in</span>
			</button>
		);
	}

	return (
		<button
			className="ListingReservationMobile__button-container__button"
			onMouseMove={(e) => getCursorPos(e, gradientRef.current)}
			onClick={props.handleClickReserve}
		>
			<span className="gradient-container">
				<span className="gradient" ref={gradientRef}></span>
			</span>
			<span className="reserve-button-text">Reserve</span>
		</button>
	);
};

export default ListingReservationMobileButton;
