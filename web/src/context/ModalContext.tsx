import { useState, createContext, useContext, useEffect } from "react";

interface IModalProviderProps {
	demoClicked: boolean;
	setDemoClicked: (x: boolean) => void;
	entry: string;
	setEntry: (x: string) => void;
	open: boolean;
	setOpen: (x: boolean) => void;
	getCursorPos: (a: any, el: HTMLElement | null) => void;
}

export const ModalContext = createContext<IModalProviderProps | undefined>(
	undefined
);

const ModalProvider: React.FC = ({ children }) => {
	const [demoClicked, setDemoClicked] = useState(false);
	const [open, setOpen] = useState(false);
	const [entry, setEntry] = useState("");

	useEffect(() => {
		if (open === false) {
			document.body.style.overflow = "unset";
			setDemoClicked(false);
		}
	}, [open]);

	const getCursorPos = (a: any, element: HTMLElement | null) => {
		const posX = a.clientX;
		const posY = a.clientY;

		if (element) {
			const { left, top, right, bottom } =
				element?.getBoundingClientRect();
			const width = right - left;
			const widthDiff = posX - left;
			const height = bottom - top;
			const heightDiff = posY - top;

			element.style.setProperty(
				"--mouse-x",
				((widthDiff / width) * 100).toString()
			);

			element.style.setProperty(
				"--mouse-y",
				((heightDiff / height) * 100).toString()
			);
		}
	};

	const providerProps: IModalProviderProps = {
		demoClicked,
		setDemoClicked,
		entry,
		setEntry,
		open,
		setOpen,
		getCursorPos,
	};

	return (
		<ModalContext.Provider value={providerProps}>
			{children}
		</ModalContext.Provider>
	);
};

const useModal = () => {
	const context = useContext(ModalContext);
	if (context === undefined) {
		throw new Error("useModal must be used within a ModalProvider");
	}
	return context;
};

export { ModalProvider, useModal };
