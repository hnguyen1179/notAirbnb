import { useState, createContext, useContext } from "react";

interface IModalProviderProps {
	entry: string;
	setEntry: (x: string) => void;
	open: boolean;
	setOpen: (x: boolean) => void;
	getCursorPos: (a: any) => void;
 }

export const ModalContext = createContext<IModalProviderProps | undefined>(
	undefined
);

const ModalProvider: React.FC = ({ children }) => {
	const [open, setOpen] = useState(false);
	const [entry, setEntry] = useState("");

	const getCursorPos = (a: any) => {
		const gradientBox = document.querySelector(".gradient") as HTMLElement;

		const posX = a.clientX;
		const posY = a.clientY;

		if (gradientBox) {
			const { left, top, right, bottom } =
				gradientBox?.getBoundingClientRect();
			const width = right - left;
			const widthDiff = posX - left;
			const height = bottom - top;
			const heightDiff = posY - top;

			gradientBox.style.setProperty(
				"--mouse-x",
				((widthDiff / width) * 75).toString()
			);

			gradientBox.style.setProperty(
				"--mouse-y",
				((heightDiff / height) * 75).toString()
			);
		}
	};

	const providerProps: IModalProviderProps = {
		entry,
		setEntry,
		open,
		setOpen,
		getCursorPos
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
