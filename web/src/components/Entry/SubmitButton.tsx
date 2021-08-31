import React, { useRef } from "react";
import { useModal } from "../../context/ModalContext";
import LoadingButton from "./LoadingButton";

interface Props {
  loading: boolean;
  children: string;
}

const SubmitButton = ({ loading, children }: Props) => {
	const gradientRef = useRef<HTMLElement>(null);
	const { getCursorPos } = useModal();

	return (
		<button
			className="EntryForm__main__form__submit-button"
			type="submit"
			disabled={loading}
			onMouseMove={(e) => getCursorPos(e, gradientRef.current)}
		>
			<span className="gradient-container">
				{loading ? (
					<LoadingButton />
				) : (
					<span className="gradient" ref={gradientRef}></span>
				)}
			</span>
      <span className="submit-button__text">{children}</span>
		</button>
	);
};

export default SubmitButton;
