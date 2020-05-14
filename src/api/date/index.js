import moment from 'moment'
import { language } from '@/global/js/baseUrl'
// 设置语言
moment.locale(language)

/**
 * @author xuanzai
 * @description 日期格式化
 */
function formatDate(date, isAccurate = false) {
	return moment(date).format(`YYYY-MM-DD${isAccurate
	? ' HH:mm:ss'
	: ''}`)
}

/**
 * @author xuanzai
 * @description 设置天数
 */
function setDay(date, number, isAccurate = false) { 
	return moment(date).add(number, 'days').format(`YYYY-MM-DD${isAccurate
	? ' HH:mm:ss'
	: ''}`)
}

/**
 * @author xuanzai
 * @description 设置月份
 */
function setMonth(date, number, isAccurate = false) {
	return moment(date).add(number, 'months').format(`YYYY-MM-DD${isAccurate
	? ' HH:mm:ss'
	: ''}`)
}

/**
 * @author xuanzai
 * @description 设置年份
 */
function setYear(date, number, isAccurate = false) {
	return moment(date).add(number, 'years').format(`YYYY-MM-DD${isAccurate
	? ' HH:mm:ss'
	: ''}`)
}

/**
 * @author xuanzai
 * @description 设置年月日时分秒
 */
function setDate(date, {
	years, quarters, months, weeks, days, hours, minutes, seconds, milliseconds
}, isAccurate = false) {
	return moment(date).add({
		years, quarters, months, weeks, days, hours, minutes, seconds, milliseconds
	}).format(`YYYY-MM-DD${isAccurate
	? ' HH:mm:ss'
	: ''}`)
}

/**
 * @author xuanzai
 * @description 时间差 date_1 - date_2
 */
function dateDiff(date_1, date_2) {
	let 
		timeLine = moment(date_1).diff(moment(date_2)) / 1000,
		second = parseInt(timeLine % (60 * 60) % 60),
		minute = parseInt(timeLine % (60 * 60) / 60),
		hour= parseInt(timeLine / 60 / 60)
	return {
		stamp: timeLine * 1000,
		seconds: timeLine,
		minutes: parseInt(timeLine / 60),
		hours: parseInt(timeLine / 60 / 60),
		days: parseInt(timeLine / 60 / 60 / 24),
		weeks: parseInt(timeLine / 60 / 60 / 24 / 7),
		time: `${hour < 10
		? `0${hour}`
		: hour}:${minute < 10
		? `0${minute}`
		: minute}:${second < 10
		? `0${second}`
		: second}`
	}
}

/**
 * @author xuanzai
 * @description 相对于现在时间
 */
function fromNow(date) {
	return moment(date).fromNow()
}

export default {
	formatDate,
	setDay,
	setMonth,
	setYear,
	setDate,
	dateDiff,
	fromNow
}