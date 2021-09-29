import { createContext, useContext, useReducer, useMemo } from "react";
import { History } from "history";
import { editQueryReducer, EditQueryState } from "../reducers/editQueryReducer";
import { BasicSearchVariables } from "../pages/SearchPage";

interface IURLParamsProviderProps {
	state: EditQueryState;
	history: History<any>;
}

export const URLParamsContext = createContext<
	IURLParamsProviderProps | undefined
>(undefined);

interface Props {
	history: History<any>;
	variables: BasicSearchVariables;
}

const editMenuDefault = {
	location: false,
	dates: false,
	guests: false,
	filters: false,
};

const URLParamsProvider: React.FC<Props> = ({ children, history, variables }) => {
	const initialReducerState = {
		...variables,
		tags: variables.tags || [],
		listingType: variables.tags || [],
		languages: variables.tags || [],
		edit: false,
		editMenu: editMenuDefault,
		location: variables.region,
		dates: {
			startDate: new Date(variables.checkIn),
			endDate: new Date(variables.checkOut),
			key: "selection",
		}
	};

	const [state, dispatch] = useReducer(editQueryReducer, initialReducerState);

	// Dispatch functions to be passed


	// Returning 
	const providerProps: IURLParamsProviderProps = {
		state,
		history,
	};

	return (
		<URLParamsContext.Provider value={providerProps}>
			{children}
		</URLParamsContext.Provider>
	);
};

const useURLParams = () => {
	const context = useContext(URLParamsContext);
	if (context === undefined) {
		throw new Error("useURLParams must be used within a URLParamsProvider");
	}

	return context;
};

export { URLParamsProvider, useURLParams };
