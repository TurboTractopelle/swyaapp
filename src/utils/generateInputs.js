import React from "react";
import Input from "../components/UI/Input/Input";

const generateInputs = (inputs, onChangeHandler) => {
	return Object.keys(inputs).map(key => (
		<Input
			data={inputs[key]}
			key={key}
			type={inputs[key].type}
			counter={inputs[key].validation.counter}
			counterMax={inputs[key].validation.counterMax}
			required={inputs[key].validation.required}
			touched={inputs[key].validation.touched}
			valid={inputs[key].validation.valid}
			value={inputs[key].value}
			title={inputs[key].title}
			placeholder={inputs[key].placeholder}
			special={inputs[key].special}
			onChangeHandler={onChangeHandler(inputs[key].name)}
		/>
	));
};

export default generateInputs;
