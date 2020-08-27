/**
 * @description 验证是否为邮箱
 * @param {String} s 
 */
export function isEmail(s) {
	return /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}
/**
 * @description 验证是否为电话号码
 * @param {String} s 
 */
export function isPhone(s) {
	return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}
/**
 * @description 验证是否为手机号码
 * @param {String} s 
 */
export function isMobile(s) {
	return /^1[345789]\d{9}$/.test(s)
}
/**
 * @description 验证是否为身份证号码
 * @param {String} s
 */
export function isId(e) {
	return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(s)
}
/**
 * @description 验证是否为网络地址
 * @param {String} s 
 */
export function isURL(s) {
	return /^http[s]?:\/\/.*/.test(s)
}
/**
 * @description 验证是否为全小写
 * @param {String} s 
 */
export function isLowerCase(s) {
	return /^[a-z]+$/.test(s)
}
/**
 * @description 验证是否为全大写
 * @param {String} s 
 */
export function isUpperCase(s) {
	return /^[A-Z]+$/.test(s)
}
/**
 * @description 验证是否为颜色值
 * @param {String} s
 */
export function isColor(color) {
	return new RegExp(/^#([\da-f]{3}){1,2}$/gi).test(color)
}
