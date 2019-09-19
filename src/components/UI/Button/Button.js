import React from "react";

const Button = props => {
	const disabled = !props.validForm;
	return (
		<button disabled={disabled} data-test="Button" onClick={props.onSubmitHandler} type="button">
			Submit
		</button>
	);
};

export default Button;
