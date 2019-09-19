import React from "react";
import classes from "./Message.module.css";

export default function Message(props) {
	return (
		<div className={classes.Message} data-test="Message">
			<span
				className={[classes.span, classes[props.cat ? props.cat : ""]].join(" ")}
				data-test="icon"
			></span>{" "}
			<div data-test="msg">{props.body}</div>
		</div>
	);
}
