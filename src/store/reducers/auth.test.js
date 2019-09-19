import reducer from "./auth";

describe("reducer", () => {
	it("returns default state when no action type found", () => {
		const state = { loading: true };
		const action = { type: "non-existing-type" };
		expect(reducer(state, action)).toEqual(state);
	});
});
