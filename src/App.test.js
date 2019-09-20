import React from "react";
import { App } from "./App";
import { shallow } from "enzyme";
import { findByTestAttribute } from "../utils/testingUtils";

let wrapper;
const setup = props => shallow(<App {...props} />);

describe("App", () => {
	beforeAll(() => {
		wrapper = setup();
	});
	/*it("displays the <App />", () => {
		const app = findByTestAttribute(wrapper, "App");
		expect(app).toHaveLength(1);
	});*/
});
