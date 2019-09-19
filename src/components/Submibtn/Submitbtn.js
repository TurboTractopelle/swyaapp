import React from "react";

const Submitbtn = props => {
	const disabled = !props.validForm;
	return (
		<button disabled={disabled} data-test="Submitbtn" onClick={props.onSubmitHandler} type="button">
			Submit
		</button>
	);
};

export default Submitbtn;
