const formDate = (dateTime, isAccurate) => {
    (Object(dateTime) instanceof Boolean && dateTime == true) ? (dateTime = "", isAccurate = true) : dateTime = ""
    let nowDate = new Date()
    let time = "", date =  dateTime ? new Date(dateTime) : new Date(nowDate.getTime() - (nowDate.getTimezoneOffset() * 60000))
    let newDate = date.toISOString().split("T")[0]
    isAccurate && (newDate = `${date.toISOString().split("T")[0]} ${date.toISOString().split("T")[1].split('.')[0]}`)
    return newDate
}

const dateDiff = (sDate1,  sDate2) => {   
    const iDays = sDate1 < sDate2 ? (new Date(sDate2) - new Date(sDate1)) : (new Date(sDate1) - new Date(sDate2))
    return iDays / 1000 / 60 / 60 / 24 
}

export default {
    formDate,
    dateDiff
}