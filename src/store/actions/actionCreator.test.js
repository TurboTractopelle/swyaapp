import actionCreator from "./actionCreator";

describe("actionCreator", () => {
	it("returns a function with the passed params as props", () => {
		expect(actionCreator("a")()).toEqual({ type: "a" });
	});

	it("returns a function with the passed params as props", () => {
		expect(actionCreator("a", "value1", "value2")(5, 6)).toEqual({
			type: "a",
			value1: 5,
			value2: 6
		});
	});
});
