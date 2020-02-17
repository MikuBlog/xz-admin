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
	return `${hour < 10
		? `0${hour}`
		: hour}:${min < 10
		? `0${min}`
		: min}:${ses < 10
		? `0${ses}`
		: ses}`
}

export default {
	formatDate,
	dateDiff,
	timeDiff
}
