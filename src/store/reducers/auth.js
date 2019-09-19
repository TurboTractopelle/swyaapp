import * as actionTypes from "../actions/actionTypes";

const initialState = {
	loading: false,
	token: null,
	userId: null,
	error: null
};

const auth = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return { ...state, loading: true };

		case actionTypes.AUTH_SUCCESS:
			console.log(action);
			return {
				...state,
				loading: false,
				token: action.idToken,
				userId: action.userId
			};

		case actionTypes.AUTH_FAIL:
			return { ...state, loading: false, error: action.error };

		case actionTypes.AUTH_STOP:
			return { ...state, error: true, token: null, userId: null };

		case actionTypes.LOGOUT:
			return { ...state, token: null, userId: null };

		case actionTypes.SET_AUTH_REDIRECT_PATH:
			return { ...state, authRedirectPath: "/b" };

		default:
			return state;
	}
};

export default auth;
