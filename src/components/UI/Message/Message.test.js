import React from "react";
import Message from "./Message";
import { shallow } from "enzyme";
import { findByTestAttribute } from "../../../../utils/testingUtils";

let wrapper;
const setup = (props = {}) => shallow(<Message {...props} />);

describe("Message", () => {
	beforeAll(() => {
		wrapper = setup({ cat: "error", body: "error msg" });
	});

	it("use the correct class", () => {
		const icon = findByTestAttribute(wrapper, "icon");
		expect(icon.hasClass("error")).toBeTruthy();
	});

	it("display the correct message", () => {
		const msg = findByTestAttribute(wrapper, "msg");
		expect(msg.text()).toBe("error msg");
	});
});
