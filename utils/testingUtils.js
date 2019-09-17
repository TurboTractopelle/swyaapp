/**
 * @param  {any} component
 * @param  {String} attr
 */
export function findByTestAttribute(component, attr) {
	// [target=_blank]
	// document.querySelectoAll([target="blank"])
	return component.find(`[data-test='${attr}']`);
}
