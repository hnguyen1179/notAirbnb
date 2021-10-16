import { RefObject } from "react";
import { UserPartial } from "../../context/AppContext";

interface Props {
	user: UserPartial | null;
	gradientRef: RefObject<HTMLElement>;
	getCursorPos: (a: any, el: HTMLElement | null) => void;
	handleOpenEntry: () => void;
	handleAddReservation: () => void;
}

const ListingReservationDesktopButton = (props: Props) => {
	if (!props.user)
		return (
			<button
				className="BoxButtons__submit-button"
				onMouseMove={(e) =>
					props.getCursorPos(e, props.gradientRef.current)
				}
				onClick={props.handleOpenEntry}
			>
				<span className="gradient-container">
					<span className="gradient" ref={props.gradientRef}></span>
				</span>
				<span className="text">Log in to book</span>
			</button>
		);

	return (
		<button
			className="BoxButtons__submit-button"
			onMouseMove={(e) =>
				props.getCursorPos(e, props.gradientRef.current)
			}
			onClick={props.handleAddReservation}
		>
			<span className="gradient-container">
				<span className="gradient" ref={props.gradientRef}></span>
			</span>
			<span className="text">Reserve</span>
		</button>
	);
};

export default ListingReservationDesktopButton;
