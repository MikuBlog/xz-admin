import { Notification } from 'element-ui'

/**
 * @author xuanzai
 * @description 通知
 * @param {String} msg 
 */
const successTip = ({ title, msg }) => {
  Notification({
    title: title || "",
    message: msg,
    type: 'success',
    customClass: "top-floor"
  })
}

const warnTip = ({ title, msg }) => {
  Notification({
    title: title || "",
    message: msg,
    type: 'warning',
    customClass: "top-floor"
  })
}

const errorTip = ({ title, msg }) => {
  Notification({
    title: title || "",
    message: msg,
    type: 'error',
    customClass: "top-floor"
  })
}

const showTipDiy = ({ title, msg, type, iconClass, isHTML }) => {
  Notification({
    title: title || "",
    message: msg,
    type: type || 'info',
    iconClass: iconClass || "",
    dangerouslyUseHTMLString: isHTML || false,
    customClass: "top-floor"
  })
}

export default {
  successTip,
  warnTip,
  errorTip,
  showTipDiy
}