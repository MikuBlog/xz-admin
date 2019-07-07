import { Message, MessageBox  } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

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

const showMsgBox = (msg, title) => {
    return MessageBox.confirm(msg, title, {
        showClose: true,
        // 是否可通过点击遮罩关闭 MessageBox
        closeOnClickModal: true,
        // 是否可通过按下 ESC 键关闭 MessageBox
        closeOnPressEscape: true,
        // 是否在 hashchange 时关闭 MessageBox
        closeOnHashChange: true,
    })
}

export default {
    successMsg,
    warnMsg,
    errorMsg,
    showMsgBox
}