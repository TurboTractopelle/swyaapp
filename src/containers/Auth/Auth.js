import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input2/Input2";
import * as actions from "../../store/actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: "email",
				elementConfig: {
					type: "text",
					placeholder: "email"
				},
				value: "",
				validation: {
					valid: false,
					required: false,
					touched: false
				}
			},
			password: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "password"
				},
				value: "",
				validation: {
					valid: false,
					required: false,
					touched: false,
					minLength: 6
				}
			}
		},
		isSignUp: true // affiche la creation de compte par défault
	};

	switchAuthModeHandler = () => {
		this.setState(prevState => ({ ...prevState, isSignUp: !prevState.isSignUp }));
	};

	inputChangeHandler = id => e => {
		const value = e.target.value;

		this.setState(prevState => {
			return {
				...prevState,
				controls: {
					...prevState.controls,
					[id]: {
						...prevState.controls[id],
						validation: {
							...prevState.controls[id].validation,
							touched: true,
							valid: this.checkValidity(value, prevState.controls[id].validation)
						},
						value
					}
				},
				formIsValid: this.checkFormValidity(prevState.controls)
			};
		});
	};

	checkValidity = (value, rules) => {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		return isValid;
	};

	checkFormValidity = orderForm => {
		// TODO refaire ici le test de validation pour avoir la dernière valeur de la validité de l id
		let formIsValidArr = [];

		for (let data in orderForm) {
			formIsValidArr.push(orderForm[data].validation.valid);
		}
		return !formIsValidArr.some(e => e === false);
	};

	submitHandler = e => {
		e.preventDefault();
		const { controls } = this.state;
		this.props.auth(controls.email.value, controls.password.value, this.state.isSignUp);
	};

	render() {
		const form = Object.entries(this.state.controls).map((input, i) => {
			const id = input[0];

			return (
				<Input
					inputtype={input[1].elementType}
					elementConfig={input[1].elementConfig}
					pvalue={input[1].value}
					changed={this.inputChangeHandler(id)}
					valid={input[1].validation.valid}
					key={id}
				/>
			);
		});

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
					{form}
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
