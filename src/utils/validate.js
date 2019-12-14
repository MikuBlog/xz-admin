/**
 * @description 验证是否为邮箱
 * @param {String} s 
 */
export function isEmail (s) {
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
  return /^1[0-9]{10}$/.test(s)
}
/**
 * @description 验证是否为网络地址
 * @param {String} s 
 */
export function isURL(s) {
  return /^http[s]?:\/\/.*/.test(s)
}