const isEmpty = (val) => {
    if(val == null || val == "" || val == undefined) {
        return true
    }else {
        return false
    }
}

const transfer = (val) => {
    return val < 10 ? `0${val}` : val
}

/**
 * @author xuanzai
 * @description 日期格式化
 * @param {String} val
 * @param {String} format
 * @returns {String} result
 */
const formatDate = (val, format) => {
    if(isEmpty(val)) return
    let 
        date = new Date(val),
        y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = date.getHours(),
        min = date.getMinutes(),
        s = date.getSeconds(),
        result = ""
    if(format == undefined) {
        result = `${y}-${transfer(m)}-${transfer(d)} ${transfer(h)}-${transfer(min)}-${transfer(s)}`
    }
    if(format == 'yyyy-mm-dd') {
        result = `${y}-${transfer(m)}-${transfer(d)}`
    }
    if(format == 'yyyy-mm') {
        result = `${y}-${transfer(m)}`
    }
    if(format == 'mm-dd') {
        result = `${transfer(m)}-${transfer(d)}`
    }
    if(format == 'hh:mm') {
        result = `${transfer(h)}:${transfer(min)}`
    }
    if(format == 'yyyy') {
        result = `${y}`
    }
    return result
}

export default {
    formatDate
}