import React from "react";
import classes from "./Message.module.css";

export default function Message(props) {
	const { msg } = props;
	return (
		<div className={classes.Message} data-test="Message">
			<span
				className={[classes.span, classes[props.cat ? props.cat : ""]].join(" ")}
				data-test="icon"
			></span>{" "}
			<div data-test="msg">
				{msg.status} {msg.body}
			</div>
		</div>
	);
}
