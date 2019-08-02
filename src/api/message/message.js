import { Message, MessageBox  } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

/**
 * @author xuanzai
 * @description 提示
 * @param {String} msg 
 */
const successMsg = (msg) => {
    Message({
        message: msg,
        type: 'success'
    })
}

const warnMsg = (msg) => {
    Message({
        message: msg,
        type: 'warning'
    })
}

const errorMsg = (msg) => {
    Message({
        message: msg,
        type: 'error'
    })
}

const showMsgBox = ({ title, msg, isHTML, type }) => {
    return MessageBox.confirm(msg || "", title || "", {
        // 不允许显示取消icon
        showClose: false,
        // 是否可通过点击遮罩关闭 MessageBox
        closeOnClickModal: true,
        // 是否可通过按下 ESC 键关闭 MessageBox
        closeOnPressEscape: true,
        // 是否在 hashchange 时关闭 MessageBox
        closeOnHashChange: true,
        // 是否将msg作为html处理
        dangerouslyUseHTMLString: isHTML || false,
        // 图标类型
        type: type || "info"
    })
}

export default {
    successMsg,
    warnMsg,
    errorMsg,
    showMsgBox
}