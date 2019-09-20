import * as actionTypes from "../actions/actionTypes";

const initialState = {
	loading: false,
	token: null,
	userId: null,
	error: null,
	message: "stuff"
};

const auth = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return { ...state, loading: true };

		case actionTypes.AUTH_SUCCESS:
			return {
				...state,
				loading: false,
				token: action.idToken,
				userId: action.userId,
				message: "connected"
			};

		case actionTypes.AUTH_FAIL:
			return { ...state, loading: false, error: action.error, message: "auth fail" };

		case actionTypes.AUTH_STOP:
			return { ...state, error: true, token: null, userId: null, message: "auth stop" };

		case actionTypes.LOGOUT:
			return { ...state, token: null, userId: null, message: "logout" };

		case actionTypes.SET_AUTH_REDIRECT_PATH:
			return { ...state, authRedirectPath: "/dossier" };

		default:
			return state;
	}
};

export default auth;
