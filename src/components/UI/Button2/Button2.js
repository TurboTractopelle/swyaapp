import React from "react";

const Button2 = props => {
	return (
		<button disabled={props.disabled} onClick={props.clicked}>
			{props.children}
		</button>
	);
};

export default Button2;
