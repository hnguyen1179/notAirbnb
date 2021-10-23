import { FC, RefObject, ReactElement, useRef } from "react";
import { ReactComponent as CloseSvg } from "../../assets/icons/bold-negative.svg";

interface Props {
  closePortal: () => void;
	className: string;
	children(containerRef: RefObject<HTMLDivElement>): ReactElement;
}

const ListingShowMore: FC<Props> = ({ children, closePortal, className }) => {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<div className={`ShowMore ShowMore--${className}`}>
			<nav className="ShowMore__nav">
				<button aria-label="Exit Button" onClick={closePortal}>
					<CloseSvg />
				</button>
			</nav>
			<div className="ShowMore__container" ref={containerRef}>
				{children(containerRef)}
			</div>
		</div>
	);
};

export default ListingShowMore;
