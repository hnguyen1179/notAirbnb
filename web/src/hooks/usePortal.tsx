import React, {
	MouseEventHandler,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";
import Fade from "../components/Fade";

const usePortal = () => {
	const [portal, setPortal] = useState(false);

	const openPortal: MouseEventHandler = useCallback((e) => {
		e.stopPropagation();
		document.body.style.overflow = "hidden";
		setPortal(true);
	}, []);

	const closePortal = useCallback(() => {
		console.log(" im in here ");
		document.body.style.overflow = "unset";
		setPortal(false);
	}, []);

	const togglePortal: MouseEventHandler = useCallback((e) => {
		e.stopPropagation();
		setPortal((prevState) => {
			if (prevState) {
				document.body.style.overflow = "unset";
			} else if (!prevState) {
				document.body.style.overflow = "hidden";
			}

			return !prevState;
		});
	}, []);

	const portalProps = {
		portal,
		closePortal,
	};

	return { Portal, portalProps, openPortal, closePortal, togglePortal };
};

interface PortalProps {
	portal: boolean;
	closePortal: () => void;
	style?: any;
	configType?: "default" | "stiff";
	enableBackground?: boolean;
}

const Portal: React.FC<PortalProps> = ({
	children,
	portal,
	closePortal,
	style,
	configType,
	enableBackground = true,
}) => {
	const portalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		console.log(' in here useeffectlayout')
		if (portalRef.current) {
			const fromTop = window.scrollY;
			console.log("FROMTOP: ", fromTop);
			portalRef.current.style.transform = `translateY(${fromTop}px)`;
		}
	}, [portal]);

	if (!portal) return null;

	return createPortal(
		<div className="Portal" ref={portalRef}>
			{enableBackground && (
				<div className="Portal__background" onClick={closePortal} />
			)}
			<div
				className="Portal__children"
				onClick={(e) => e.stopPropagation()}
			>
				<Fade style={style} configType={configType}>
					<>{children}</>
				</Fade>
			</div>
		</div>,
		document.querySelector("#root") as Element
	);
};

export { usePortal };
