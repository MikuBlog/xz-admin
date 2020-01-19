/**
 * @author xuanzai
 * @description 类型检测
 * @param {*} val
 * @returns {String}
 */
function type(val) {
	return Object
		.prototype
		.toString
		.call(val)
		.split(' ')[1]
		.split(']')[0]
		.toLowerCase()
}

[
	"Number",
	"Boolean",
	"String",
	"Object",
	"Null",
	"Undefined",
	"Symbol",
	"Array",
	"Date"
].forEach(value => {
	type[`is${value}`] = (val) => {
		return type(val) === value.toLowerCase()
	}
})

export default type
