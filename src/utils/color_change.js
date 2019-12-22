/**
 * @description 将rgb颜色换砖为十六进制
 */
export function toColorHex(color) {
  var that = new String(color)
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(that)) {
    var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      if (hex === "0") {
        hex += hex;
      }
      if (aColor[i] < 16) {
        hex = "0" + hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = that;
    }
    return strHex;
  } else if (reg.test(that)) {
    var aNum = that.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return that;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var i = 0; i < aNum.length; i += 1) {
        numHex += (aNum[i] + aNum[i]);
      }
      return numHex;
    }
  } else {
    return that;
  }
};

/**
 * @description 将颜色转换为rgb数组
 */
export function toColorRgb(color) {
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (color && reg.test(color)) {
    if (color.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt("0x" + color.slice(i, i + 2)));
    }
    return sColorChange;
  } else {
    return color;
  }
};