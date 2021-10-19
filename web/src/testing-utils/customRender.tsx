import { render } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { ModalProvider } from "../context/ModalContext";

export const customRender = (
	node: JSX.Element | null,
	mocks?: MockedResponse[]
) => {
	return {
		...render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ModalProvider>
          {node}
        </ModalProvider>
			</MockedProvider>
		),
	};
};
