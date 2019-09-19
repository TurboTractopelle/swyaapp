import React from "react";
import SelectCountry from "../../SelectCountry/SelectCountry";

const Input = props => {
	const required = props.data.validation.required && <span className="required">*</span>;
	const valid = props.data.validation.touched
		? props.data.validation.valid
			? "valid"
			: "notValid"
		: null;

	let input;
	if (props.data.type === "textarea") {
		input = (
			<div>
				<textarea name={props.data.title} onChange={props.onChangeHandler} />
				<span className="counter">
					{props.data.validation.counter}/{props.data.validation.counterMax}
				</span>
			</div>
		);
	} else if (props.data.type === "select" && props.data.title === "Country") {
		input = (
			<SelectCountry
				tops={props.data.special.tops}
				placeholder={props.data.placeholder}
				onChangeHandler={props.onChangeHandler}
			/>
		);
	} else {
		input = (
			<input
				type={props.data.type}
				name={props.data.title}
				value={props.data.value}
				placeholder={props.data.placeholder}
				onChange={props.onChangeHandler}
				data-test="input"
			/>
		);
	}

	return (
		<div className={["item", props.data.title, valid].join(" ")} data-test="inputWrapper">
			<label htmlFor={props.data.title}>
				{props.data.title}
				{required}:{" "}
			</label>
			{input}
		</div>
	);
};

export default Input;
