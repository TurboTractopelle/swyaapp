import * as actionTypes from "../actions/actionTypes";

const initialState = {
	loading: false
};

function auth(state = initialState, action) {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return { ...state, loading: true };

		default:
			return state;
	}
}

export default auth;
