/**
 * @param  {Object} form The form inputs from the state
 * @param  {String} name Name of the current modified field
 * @param  {Boolean} status Validation status of the current modified field
 */
const checkFormValidation = (form, name, status) => {
	return Object.keys(form).reduce((a, k) => {
		let inputValidation = form[k].validation.valid;
		if (k === name) {
			inputValidation = status;
		}
		return (a = a && inputValidation);
	}, true);
};

export default checkFormValidation;
