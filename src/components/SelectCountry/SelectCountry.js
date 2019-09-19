import React from "react";
import { countries as countriesList } from "countries-list";

const SelectCountry = props => {
	const { placeholder = "Select" } = props;
	const { tops = [] } = props;
	const top = [placeholder, ...tops];
	const countries = top.concat(
		Object.entries(countriesList)
			.reduce((a, k) => {
				return (a = top.includes(k[1].name) ? a : [...a, k[1].name]);
			}, [])
			.sort((a, b) => a.localeCompare(b))
	);

	return (
		<div>
			<select data-test="select" onChange={props.onChangeHandler}>
				{countries.map(c => (
					<option key={c}>{c}</option>
				))}
			</select>
		</div>
	);
};

export default SelectCountry;
