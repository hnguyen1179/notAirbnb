import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

interface Props {
	isOpen: boolean;
	children: JSX.Element;
}

const SectionContent: React.FC<Props> = ({ children, isOpen }) => {
	const contentRef = useRef<HTMLDivElement>(null);
	const [hide, setHide] = useState(true);

	return (
		<div>
			<CSSTransition
				in={isOpen}
				timeout={250}
				classNames="content"
				nodeRef={contentRef}
				onEnter={() => {
					setHide(false);
				}}
				onExited={() => {
					setHide(true);
				}}
			>
				<div className="SectionContent" aria-hidden={hide} ref={contentRef}>
					{children}
				</div>
			</CSSTransition>
		</div>
	);
};

export default SectionContent;
