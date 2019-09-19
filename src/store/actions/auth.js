import * as actionTypes from "./actionTypes";
import axios from "axios";

const actionCreactor = (type, ...autreArgs) => {
	return (...arg) => {
		const action = { type };
		autreArgs.map((item, i) => (action[item] = arg[i]));
		return action;
	};
};

export const authStart = actionCreactor(actionTypes.AUTH_START);
export const authSuccess = actionCreactor(actionTypes.AUTH_SUCCESS, "idToken", "userId");
export const authFail = actionCreactor(actionTypes.AUTH_FAIL, "error");
export const authStop = actionCreactor(actionTypes.AUTH_STOP);

export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => dispatch(authStop()), expirationTime * 1000);
	};
};

export const auth = (email, password, isSignUp) => {
	return dispatch => {
		dispatch(authStart()); // déclenche loader

		const authData = { email, password, returnSecureToken: true }; //
		let url =
			"https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBQPz7UZoAUosQIFutJpkDXKsfoa_LYpKc";
		if (!isSignUp) {
			url =
				"https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBQPz7UZoAUosQIFutJpkDXKsfoa_LYpKc";
		}

		axios
			.post(url, authData)
			.then(res => {
				// local storage
				const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
				localStorage.setItem("token", res.data.idToken);
				localStorage.setItem("expirationDate", expirationDate.toString());
				localStorage.setItem("userId", res.data.localId);

				// store
				dispatch(authSuccess(res.data.idToken, res.data.localId));
				dispatch(checkAuthTimeout(res.data.expiresIn));
			})

			.catch(error => dispatch(authFail(error.response.data.error.message)));
	};
};

export const setAuthRedirectPath = actionCreactor(actionTypes.SET_AUTH_REDIRECT_PATH, "path");

export const logout = () => {
	//remove from local store
	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");
	localStorage.removeItem("userId");

	return {
		type: actionTypes.LOGOUT
	};
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem("token");
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem("expirationDate"));
			if (expirationDate < new Date()) {
				dispatch(logout());
			} else {
				const userId = localStorage.getItem("userId");
				dispatch(authSuccess(token, userId)); // (actionTypes.AUTH_SUCCESS, "idToken", "userId")
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
			}
		}
	};
};
