import * as actionTypes from "../actions/actionTypes";

const initialState = {
	loading: false,
	token: null,
	userId: null,
	error: null,
	message: {}
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
				message: { status: "success", body: "You are now connected" }
			};

		case actionTypes.AUTH_FAIL:
			return {
				...state,
				loading: false,
				error: action.error,
				message: { status: "danger", body: "Authentication failed" }
			};

		case actionTypes.AUTH_STOP:
			return {
				...state,
				error: true,
				token: null,
				userId: null,
				message: { status: "danger", body: "Authentication stopped" }
			};

		case actionTypes.LOGOUT:
			return {
				...state,
				token: null,
				userId: null,
				message: { status: "success", body: "You have successfully logged out" }
			};

		case actionTypes.SET_AUTH_REDIRECT_PATH:
			return { ...state, authRedirectPath: "/dossier" };

		case actionTypes.MESSAGE_RESET:
			return { ...state, message: {} };

		default:
			return state;
	}
};

export default auth;
