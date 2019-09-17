const actionCreator = (type, ...params) => {
	return (...values) => {
		const action = { type };
		params.map((param, i) => (action[param] = values[i]));
		return action;
	};
};

export default actionCreator;
