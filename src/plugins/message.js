import { Message } from 'element-ui'
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
        type: 'warn'
    })
}

const errorMsg = (msg) => {
    Message({
        message: msg,
        type: 'error'
    })
}

export default {
    successMsg,
    warnMsg,
    errorMsg
}