import React from "react";
import SelectCountry from "../../SelectCountry/SelectCountry";
import PropTypes from "prop-types";

const Input = props => {
	const required = props.required && <span className="required">*</span>;
	const valid = props.touched ? (props.valid ? "valid" : "notValid") : null;

	let input;
	if (props.data.type === "textarea") {
		input = (
			<div>
				<textarea name={props.data.title} onChange={props.onChangeHandler} />
				<span className="counter">
					{props.counter}/{props.counterMax}
				</span>
			</div>
		);
	} else if (props.type === "select" && props.data.title === "Country") {
		input = (
			<SelectCountry
				tops={props.special.tops}
				placeholder={props.placeholder}
				onChangeHandler={props.onChangeHandler}
			/>
		);
	} else {
		input = (
			<input
				type={props.type}
				name={props.title}
				value={props.value}
				placeholder={props.placeholder}
				onChange={props.onChangeHandler}
				data-test="input"
			/>
		);
	}

	return (
		<div className={["item", props.title, valid].join(" ")} data-test="inputWrapper">
			<label htmlFor={props.title}>
				{props.title}
				{required}:{" "}
			</label>
			{input}
		</div>
	);
};

Input.protTypes = {
	counter: PropTypes.number,
	counterMax: PropTypes.number,
	name: PropTypes.string,
	onChangeHandler: PropTypes.func,
	required: PropTypes.bool,
	touched: PropTypes.bool,
	type: PropTypes.string,
	valid: PropTypes.bool,
	value: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
	special: PropTypes.object
};

export default Input;
