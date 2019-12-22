import axios from 'axios'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
import { Loading, Message } from 'element-ui'

let loading = ""

function getImageFile(url) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: "get",
      responseType: 'blob'
    }).then(data => {
      resolve(data.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * @author xuanzai
 * @description 批量导出文件
 * @param {Array} fileList 压缩文件名称
 * @param {fileName} fileName 文件名称
 */
export default async (fileList, fileName = 'file') => {
  const 
    zip = new JSZip(),
    promises = []
  loading = Loading.service({ fullscreen: true, background: "rgba(255, 255, 255, .4)", customClass: 'top-floor' })
  Message({
    message: "正在导出，请耐心等待",
    type: 'info',
    customClass: "top-floor"
  })
  await fileList.forEach(val => {
    const promise = getImageFile(val).then(data => {
      const arr = val.split("/")
      const fileName = arr[arr.length - 1]
      zip.file(fileName, data)
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