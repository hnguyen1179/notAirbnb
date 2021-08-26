import { useState, createContext, useContext } from "react";

interface IModalProviderProps {
	entry: string;
	setEntry: (x: string) => void;
	open: boolean;
	setOpen: (x: boolean) => void;
}

export const ModalContext = createContext<IModalProviderProps | undefined>(
	undefined
);

const ModalProvider: React.FC = ({ children }) => {
	const [open, setOpen] = useState(false);
	const [entry, setEntry] = useState("");

	const providerProps: IModalProviderProps = {
		entry,
		setEntry,
		open,
		setOpen,
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
