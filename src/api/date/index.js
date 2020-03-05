/**
 * @author xuanzai
 * @description 日期格式化
 * @param {Date} dateTime 日期
 * @param {Boolean} isAccurate 是否精确到时分秒 
 */
const formatDate = (dateTime, isAccurate = false) => {
	if ((typeof dateTime).toLowerCase() === 'string') {
		dateTime = dateTime.replace(/-/g, "/")
	}
	let nowDate = new Date(dateTime)
	let date = new Date(nowDate.getTime() - (nowDate.getTimezoneOffset() * 60000))
	let newDate = date.toISOString().split("T")[0]
	isAccurate
		&&
		(newDate = `${date.toISOString().split("T")[0]} ${date.toISOString().split("T")[1].split('.')[0]}`)
	return newDate
}

/**
 * @author xuanzai
 * @description 日期差
 * @param {Date} sDate1 时间戳
 * @param {Date} sDate2 时间戳
 * @param {Boolean} isNegative true，返回结果可以为负值，否则都为正值
 */
const dateDiff = (sDate1, sDate2, isNegative) => {
	let iDays = ""
	isNegative
		?
		iDays = new Date(sDate1) - new Date(sDate2) :
		iDays = sDate1 < sDate2 ?
		(new Date(sDate2) - new Date(sDate1)) :
		(new Date(sDate1) - new Date(sDate2))
	return iDays / 1000 / 60 / 60 / 24
}

/**
 * @author xuanzai
 * @description 时间差
 * @param {Date} time_1 时间戳
 * @param {Date} time_2 时间戳
 */
const timeDiff = (time_1, time_2) => {
	let time = ""
	time = time_1 < time_2 ?
		(new Date(time_2) - new Date(time_1)) :
		(new Date(time_1) - new Date(time_2))
	let hour = Math.floor(time / 1000 / 60 / 60)
	let min = Math.floor((time % (60 * 60 * 1000)) / 1000 / 60)
	let ses = Math.floor(((time % (60 * 60 * 1000)) % (60 * 1000)) / 1000)
	return {
		time: `${hour < 10
		? `0${hour}`
		: hour}:${min < 10
		? `0${min}`
		: min}:${ses < 10
		? `0${ses}`
		: ses}`,
		hour,
		min,
		ses,
		totalSes: hour * 3600 + min * 60 + ses
	}
}


/**
 * @author xuanzai
 * @description 获取指定日期
 */
function getFirstDate() {
	let date = new Date()
	date.setDate(1)
	return formatDate(date)
}

function getLastDate() {
	let date = new Date()
	date.setMonth(date.getMonth() + 1)
	return formatDate(new Date(date).setDate(0))
}

function getPreMonth(n) {
	let date = new Date()
	date.setMonth(date.getMonth() - n)
	return formatDate(date)
}

function getPreDate(n) {
	return formatDate(new Date().getTime() - n * 1000 * 60 * 60 * 24)
}

function getAfterMonth(n) {
	let date = new Date()
	date.setMonth(date.getMonth() + n)
	return formatDate(date)
}

function getAfterDate(n) {
	return formatDate(new Date().getTime() + n * 1000 * 60 * 60 * 24)
}

export default {
	formatDate,
	dateDiff,
	timeDiff,
	getFirstDate,
	getLastDate,
	getPreMonth,
	getPreDate,
	getAfterMonth,
	getAfterDate
}
