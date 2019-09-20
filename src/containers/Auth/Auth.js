import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import generateInputs from "../../utils/generateInputs";
import checkFormValidation from "../../utils/checkFormValidation";

class Auth extends Component {
	state = {
		form: {
			email: {
				name: "email",
				title: "email",
				type: "text",
				value: "",
				validation: {
					valid: false,
					required: false,
					touched: false
				}
			},
			password: {
				name: "password",
				title: "password",
				type: "text",
				value: "",
				placeholder: "password",
				validation: {
					valid: false,
					required: false,
					touched: false,
					minLength: 6
				}
			}
		},
		formValidation: {
			valid: false
		},
		isSignUp: true // affiche la creation de compte par défault
	};

	switchAuthModeHandler = () => {
		this.setState(prevState => ({ ...prevState, isSignUp: !prevState.isSignUp }));
	};

	inputChangeHandler = id => e => {
		const value = e.target.value;

		const inputValidationStatus = this.inputValidation(id, value);
		const checkedFormValidation = checkFormValidation(this.state.form, id, inputValidationStatus);

		this.setState(prevState => {
			return {
				...prevState,
				form: {
					...prevState.form,
					[id]: {
						...prevState.form[id],
						validation: {
							...prevState.form[id].validation,
							touched: true,
							valid: this.inputValidation(id, value)
						},
						value
					}
				},
				formValidation: {
					valid: checkedFormValidation(prevState.form, id, inputValidationStatus)
				}
			};
		});
	};

	inputValidation = (name, newValue) => {
		const { validation } = this.state.form[name];

		let isValid = true;

		if (validation.required) {
			isValid = newValue.trim() !== "" && isValid;
		}

		if (validation.minLength) {
			isValid = newValue.length >= validation.minLength && isValid;
		}
		if (validation.maxLength) {
			isValid = newValue.length <= validation.maxLength && isValid;
		}

		return isValid;
	};

	submitHandler = e => {
		e.preventDefault();
		const { form } = this.state;
		this.props.auth(form.email.value, form.password.value, this.state.isSignUp);
	};

	render() {
		const inputs = generateInputs(this.state.form, this.inputChangeHandler);

		let redirect = null;
		if (this.props.isAuthenticated) {
			redirect = <Redirect to={this.props.authRedirectPath} />;
		}

		return (
			<div className="ContactData">
				<h2>{this.state.isSignUp ? "CREER COMPTE" : "SE CONNECTER"}</h2>
				{this.props.auth.error && <p>ERROR</p>}

				{redirect}

				<form onSubmit={this.submitHandler}>
					{inputs}
					<Button btnType="Success">SUBMIT</Button>
				</form>
				<Button btnType="Danger" clicked={this.switchAuthModeHandler}>
					SWITCH TO {!this.state.isSignUp ? "CREER COMPTE" : "SE CONNECTER"}
				</Button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null
	};
};

const dispatchToProps = dispatch => {
	return {
		auth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
	};
};

export default connect(
	mapStateToProps,
	dispatchToProps
)(Auth);
