/**
 * @author xuanzai
 * @description 用于elementui的表单验证
 */
import { isEmail, isMobile, isPhone, isId, isURL, isLowerCase, isUpperCase } from './validate.js'

// 是否为手机号码
export function validateMobile(rule, value, callback) {
	if(!rule.required && !value) {
		callback();
		return
	}
	if (!value) {
	  callback(new Error("请输入手机号码"));
	} else if (!isMobile(value)) {
	  callback(new Error("请输入正确的11位手机号码"));
	} else {
	  callback();
	}
}

// 是否为电话号码
export function validatePhone(rule, value, callback) {
	if(!rule.required && !value) {
		callback();
		return
	}
	if (!value) {
	  callback(new Error("请输入电话号码"));
	} else if (!isPhone(value)) {
	  callback(new Error("请输入正确的电话号码"));
	} else {
	  callback();
	}
}

// 是否为手机、电话号码
export function validateBothPhMob(rule, value, callback) {
	if(!rule.required && !value) {
		callback();
		return
	}
	if (!value) {
	  callback(new Error("请输入手机或电话号码"));
	} else if (!isPhone(value) && !isMobile(value)) {
	  callback(new Error("请输入正确的手机或电话号码"));
	} else {
	  callback();
	}
}

// 是否为邮箱
export function validateEmail(rule, value, callback) {
	if(!rule.required && !value) {
		callback();
		return
	}
	if (!value) {
	  callback(new Error("请输入邮箱"));
	} else if (!isEmail(value)) {
	  callback(new Error("请输入正确的邮箱格式"));
	} else {
	  callback();
	}
}

// 是否为身份证号码
export function validateId(rule, value, callback) {
	if(!rule.required && !value) {
		callback();
		return
	}
	if (!value) {
	  callback(new Error("请输入身份证号码"));
	} else if (!isId(value)) {
	  callback(new Error("请输入正确的身份证格式"));
	} else {
	  callback();
	}
}

// 是否为url
export function validateUrl(rule, value, callback) {
	if(!rule.required && !value) {
		callback();
		return
	}
	if (!value) {
	  callback(new Error("请输入网络地址"));
	} else if (!isURL(value)) {
	  callback(new Error("请输入正确的网络地址格式"));
	} else {
	  callback();
	}
}

// 是否为小写字母
export function validateLowerCase(rule, value, callback) {
	if(!rule.required && !value) {
		callback();
		return
	}
	if (!value) {
	  callback(new Error("请输入全小写字符串"));
	} else if (!isLowerCase(value)) {
	  callback(new Error("所有字母必须全小写"));
	} else {
	  callback();
	}
}

// 字母是否全大写
export function validateUpperCase(rule, value, callback) {
	if(!rule.required && !value) {
		callback();
		return
	}
	if (!value) {
	  callback(new Error("请输入全大写字符串"));
	} else if (!isUpperCase(value)) {
	  callback(new Error("所有字母必须全部大写"));
	} else {
	  callback();
	}
}

// 是否为数字，且是否满足数字所在范围
export function validateNumber(rule, value, callback) {
	if(!rule.required && !value) {
		callback();
		return
	}
	if (!value && value !== 0) {
	  callback(new Error("输入框不能为空"));
	} else if (isNaN(value)) {
	  callback(new Error("输入值必须为数字"));
	} else if (rule.min !== undefined && value < rule.min) {
		callback(new Error(`输入值不能小于${rule.min}`));
	} else if(rule.max !== undefined && value > rule.max) {
		callback(new Error(`输入值不能大于${rule.max}`))
	} else {
	  callback();
	}
}