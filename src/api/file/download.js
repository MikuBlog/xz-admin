
import axios from 'axios'
import { Loading, Message } from 'element-ui'
/**
 * @author xuanzai
 * @description 下载文件
 * @param {String} url 下载路径
 * @param {String} fileName 文件名称
 */
let loading = ""

function download(url, fileName) {
  loading = Loading.service({ fullscreen: true, background: "rgba(255, 255, 255, .4)", customClass: 'top-floor' })
  Message({
    message: "正在下载文件，请耐心等待",
    type: 'info',
    customClass: "top-floor"
  })
  axios({
    url,
    method: "get",
    responseType: 'blob'
  }).then(result => {
    const
      a = document.createElement('a'),
      arr = url.split('/')
    a.download = fileName || arr[arr.length - 1]
    a.href = window.URL.createObjectURL(result.data)
    a.click()
    loading.close()
  }).catch(e => {
    Message({
      message: e,
      type: 'error',
      customClass: "top-floor"
    })
    loading.close()
  })
}

export default download