import axios from 'axios'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
import { Loading, Message } from 'element-ui'

let loading = ""

function getFile(url) {
  return axios({
    url,
    method: "get",
    responseType: 'blob'
  })
}
/**
 * @author xuanzai
 * @description 批量导出文件
 * @param {Array} fileList 文件地址列表
 * @param {fileName} fileName 压缩文件名称
 */
export default (fileList, fileName = 'file') => {
  const
    zip = new JSZip(),
    promises = []
  loading = Loading.service({ 
    fullscreen: true, 
    background: "rgba(255, 255, 255, .4)", 
    customClass: 'top-floor' 
  })
  Message({
    message: "正在导出，请耐心等待",
    type: 'info',
    customClass: "top-floor"
  })
  fileList.forEach(url => {
    const promise = getFile(url).then(data => {
      const arr = url.split("/")
      const fileName = arr[arr.length - 1]
      zip.file(fileName, data.data)
    })
    promises.push(promise)
  })
  Promise.all(promises).then(() => {
    zip.generateAsync({
      type: 'blob'
    }).then(content => {
      FileSaver.saveAs(content, `${fileName}.zip`)
      loading.close()
    })
  }).catch(e => {
    Message({
      message: e,
      type: 'error',
      customClass: "top-floor"
    })
    loading.close()
  })
}