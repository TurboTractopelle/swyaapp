import React, { Component } from "react";
import Input from "../components/Input/Input";
import Submitbtn from "../components/Submibtn/Submitbtn";
import "./Form.scss";

class Form extends Component {
	state = {
		form: {
			firstname: {
				name: "firstname",
				title: "First name",
				type: "text",
				value: "",
				placeholder: "Enter your first name",
				validation: {
					required: true,
					valid: false,
					touched: false
				}
			},
			lastname: {
				name: "lastname",
				title: "Last name",
				type: "text",
				value: "",
				placeholder: "Enter your last name",
				validation: {
					required: true,
					valid: false,
					touched: false
				}
			},
			phone: {
				name: "phone",
				title: "Phone",
				type: "text",
				value: "",
				placeholder: "Enter your phone number",
				validation: {
					required: false,
					valid: true,
					touched: false
				}
			},
			email: {
				name: "email",
				title: "Email",
				type: "email",
				value: "",
				placeholder: "Enter your email address",
				validation: {
					required: true,
					valid: false,
					touched: false
				}
			},
			company: {
				name: "company",
				title: "Company",
				type: "text",
				value: "",
				placeholder: "Enter your company",
				validation: {
					required: false,
					valid: true,
					touched: false
				}
			},
			country: {
				name: "country",
				title: "Country",
				type: "select",
				value: "",
				placeholder: "Select your country",
				validation: {
					required: false,
					valid: true,
					touched: false
				},
				special: {
					tops: ["France"]
				}
			},
			message: {
				name: "message",
				title: "Message",
				type: "textarea",
				value: "",
				placeholder: "",
				validation: {
					required: true,
					valid: false,
					touched: false,
					counter: 0,
					counterMax: 255
				}
			}
		},
		formValidation: {
			valid: false
		},
		formSubmission: false
	};

	inputValidation = (name, newValue) => {
		const { validation } = this.state.form[name];
		let out = true;

		if (validation.required && newValue.length === 0) {
			out = out && false;
		}

		if (this.state.form[name].type === "textarea") {
			if (newValue.length > this.state.form[name].validation.counterMax) {
				out = out && false;
			}
		}

		return out;
	};

	checkFormValidation = (name, status) => {
		return Object.keys(this.state.form).reduce((a, k) => {
			let inputValidation = this.state.form[k].validation.valid;
			if (k === name) {
				inputValidation = status;
			}
			return (a = a && inputValidation);
		}, true);
	};

	onChangeHandler = name => e => {
		const newValue = e.target.value;
		const inputValidationStatus = this.inputValidation(name, newValue);
		const checkFormValidation = this.checkFormValidation(name, inputValidationStatus);

		this.setState(prevState => {
			let nameValidation;
			if (this.state.form[name].type === "textarea") {
				nameValidation = { counter: newValue.length };
			}

			return {
				...prevState,
				form: {
					...prevState.form,
					[name]: {
						...prevState.form[name],
						value: newValue,
						validation: {
							...prevState.form[name].validation,
							touched: true,
							valid: inputValidationStatus,
							...nameValidation
						}
					}
				},
				formValidation: {
					...prevState.formValidation,
					valid: checkFormValidation
				}
			};
		});
	};

	generateInputs = () => {
		return Object.keys(this.state.form).map(key => (
			<Input
				data={this.state.form[key]}
				key={key}
				onChangeHandler={this.onChangeHandler(this.state.form[key].name)}
			/>
		));
	};

	getFormData = () => {
		let bodyFormData = new FormData();
		let keys = Object.keys(this.state.form);
		for (let i = 0; i < keys.length; i++) {
			bodyFormData.set(this.state.form[keys[i]].name, this.state.form[keys[i]].value);
			bodyFormData.set("p_company", this.props.company);
			bodyFormData.set("p_name", this.props.product);
		}
		return bodyFormData;
	};

	onSubmitHandler = e => {
		e.preventDefault();
		console.log(e);
	};

	render() {
		const validForm = this.state.formValidation.valid;
		const inputs = this.generateInputs();
		const formDisplay = this.state.formSubmission ? (
			<p>posted</p>
		) : (
			<div>
				<h2>Request info about this product</h2>
				<form>
					{inputs}
					<Submitbtn validForm={validForm} onSubmitHandler={this.onSubmitHandler} />
				</form>
			</div>
		);

		return <div data-test="formWrapper">{formDisplay}</div>;
	}
}

export default Form;
