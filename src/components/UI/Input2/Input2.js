import React from "react";

const Input = props => {
	const valid = props.valid ? "valid" : null;

	let inputElement = null;

	switch (props.inputtype) {
		case "input":
			inputElement = (
				<input
					className=""
					{...props.elementConfig}
					value={props.pvalue}
					onChange={props.changed}
				/>
			);
			break;
		case "select":
			inputElement = (
				<select className="" value={props.pvalue} onChange={props.changed}>
					{props.elementConfig.options.map(option => (
						<option key={option.value}>{option.display}</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					className=""
					{...props.elementConfig}
					value={props.pvalue}
					onChange={props.changed}
				/>
			);
	}

	return (
		<div className="">
			<label className="">{props.label}</label>
			{inputElement}
		</div>
	);
};

export default Input;
