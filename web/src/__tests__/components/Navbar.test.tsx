import { fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Navbar from "../../components/Navbar";
import { customRender } from "../../testing-utils/customRender";
import { meQuery } from "../../graphql/queries/me";

const meUserPresentMock = {
	request: {
		query: meQuery,
	},
	result: {
		data: {
			user: {
				firstName: "User",
				lastName: "Demo",
			},
			token: "Some Token",
		},
	},
};

const meUserNullMock = {
	request: {
		query: meQuery,
	},
	result: {
		data: {
			user: null,
			token: null,
		},
	},
};

afterEach(cleanup);
const waitForData = () => new Promise((res) => setTimeout(res, 0));

describe("<Navbar />", () => {
	it("renders the <Navbar /> with login and signup buttons", async () => {
		const { container, getByText } = customRender(<Navbar />, [
			meUserNullMock,
		]);

		await waitForData();

		expect(getByText(/log in/i)).toBeInTheDocument();
		expect(getByText(/sign up/i)).toBeInTheDocument();
		expect(container.firstChild).toMatchSnapshot();
	});

  // Navbar relies on an external AppState which queries 
	// it("renders the user's new if logged in", async () => {
	// 	const { getByTestId } = customRender(<Navbar />, [meUserPresentMock]);

	// 	await waitForData();

	// 	expect(getByTestId("greeting")).toBe("Hello, User");
	// });

	it("renders the correct modal depending on button", async () => {
		const { getByText } = customRender(<Navbar />, [meUserNullMock]);

		await waitForData();

		fireEvent.click(getByText(/log in/i));
		expect(getByText(/welcome/i)).toBeInTheDocument();

		fireEvent.click(getByText(/sign up/i));
		expect(getByText(/sign up/i)).toBeInTheDocument();
	});
});
