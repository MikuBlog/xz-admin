const formatMoney = (n,c,d,t) => {
  var c = isNaN(c = Math.abs(c)) ? 2 : c,//保留的小数位
      d = d === undefined ? "." : d,//整数和小数的分隔符
      t = t === undefined ? "," : t,//千分符
      s = n < 0 ? "-" : "",//正负
      i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),//整数部分
      j = (j = i.length) > 3 ? j % 3 : 0;//不整3的前面的位数长度
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}
export default formatMoney 